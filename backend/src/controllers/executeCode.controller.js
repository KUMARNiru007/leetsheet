import { db } from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Shared evaluation pipeline.
// mode: "run"    -> sample cases (isSample: true), older problems fall back to the first 3 cases.
// mode: "submit" -> the full hidden test suite.
const evaluate = async ({ problemId, source_code, language_id, mode, customTestCases }) => {
  const problem = await db.problem.findUnique({ where: { id: problemId } });

  if (!problem) {
    throw new HttpError(404, "Problem not found");
  }

  const allTestcases = Array.isArray(problem.testcases) ? problem.testcases : [];
  if (allTestcases.length === 0) {
    throw new HttpError(400, "Problem has no test cases");
  }

  const isSubmit = mode === "submit";
  const sampleCases = allTestcases.filter((tc) => tc.isSample === true);

  const testcases = isSubmit
    ? allTestcases
    : sampleCases.length > 0
      ? sampleCases
      : allTestcases.slice(0, 3);

  // User-supplied cases are only ever used for Run, never for Submit.
  const extraCases = !isSubmit
    ? (Array.isArray(customTestCases) ? customTestCases : [])
        .filter((tc) => tc && typeof tc.input === "string" && typeof tc.output === "string")
        .slice(0, 5)
        .map((tc) => ({ input: tc.input, output: tc.output }))
    : [];

  const combined = [...testcases, ...extraCases];

  const stdin = combined.map((tc) => tc.input);
  const expectedOutputs = combined.map((tc) => tc.output);

  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));

  const submitResponse = await submitBatch(submissions);
  const tokens = submitResponse.map((res) => res.token);

  const results = await pollBatchResults(tokens);

  let allPassed = true;
  const detailedResults = results.map((result, i) => {
    const stdout = result.stdout?.trim();
    const expected = expectedOutputs[i]?.trim();
    const passed = stdout === expected;

    if (!passed) allPassed = false;

    return {
      testCase: i + 1,
      passed,
      stdout,
      expected,
      stderr: result.stderr || null,
      compile_output: result.compile_output || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  return { allPassed, detailedResults, stdin };
};

// POST /api/v1/execute-code/run — dry run against sample cases only.
// Never persists, never marks a problem solved.
export const runCode = async (req, res) => {
  try {
    const { source_code, language_id, problemId, customTestCases } = req.body;

    if (!source_code || !language_id || !problemId) {
      return res
        .status(400)
        .json({ error: "Missing source_code, language_id or problemId" });
    }

    const { allPassed, detailedResults } = await evaluate({
      problemId,
      source_code,
      language_id,
      mode: "run",
      customTestCases,
    });

    return res.status(200).json({
      success: true,
      message: "Code ran successfully",
      submission: {
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: JSON.stringify(detailedResults.map((r) => r.memory)),
        time: JSON.stringify(detailedResults.map((r) => r.time)),
        testCases: detailedResults,
      },
    });
  } catch (error) {
    console.error("Error running code:", error.message);
    res
      .status(error instanceof HttpError ? error.status : 500)
      .json({ error: error instanceof HttpError ? error.message : "Failed to run code" });
  }
};

// POST /api/v1/execute-code/submit — full test suite + persisted submission.
export const submitCode = async (req, res) => {
  try {
    const { source_code, language_id, problemId } = req.body;
    const userId = req.user.id;

    if (!source_code || !language_id || !problemId) {
      return res
        .status(400)
        .json({ error: "Missing source_code, language_id or problemId" });
    }

    const { allPassed, detailedResults, stdin } = await evaluate({
      problemId,
      source_code,
      language_id,
      mode: "submit",
    });

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });

    // Mark the problem as solved for the current user if all test cases pass.
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    await db.testCaseResult.createMany({
      data: detailedResults.map((result) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
      })),
    });

    const submissionWithTestCase = await db.submission.findUnique({
      where: { id: submission.id },
      include: { testCases: true },
    });

    res.status(200).json({
      success: true,
      message: "Code Executed! Successfully!",
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error("Error submitting code:", error.message);
    res
      .status(error instanceof HttpError ? error.status : 500)
      .json({ error: error instanceof HttpError ? error.message : "Failed to submit code" });
  }
};

// Legacy alias: POST /api/v1/execute-code — keeps already-deployed
// frontends working during the rollout by dispatching on the old `store` flag.
export const legacyExecuteCode = (req, res) => {
  if (req.body.store === false) {
    return runCode(req, res);
  }
  return submitCode(req, res);
};