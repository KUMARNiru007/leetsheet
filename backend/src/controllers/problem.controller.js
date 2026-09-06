import {db} from "../libs/db.js"
import {
   getJudge0LanguageId,
   pollBatchResults,
   submitBatch,
 } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  // Going to get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // 1. Authorization FIRST - never touch the DB before this check.
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to create problem",
    });
  }

  try {
    if (!referenceSolutions || typeof referenceSolutions !== "object" || Array.isArray(referenceSolutions)) {
      return res.status(400).json({
        error: "referenceSolutions must be a non-empty object",
      });
    }
    if (!Array.isArray(testcases) || testcases.length === 0) {
      return res.status(400).json({
        error: "testcases must be a non-empty array",
      });
    }

    // 2. Verify every reference solution passes all test cases BEFORE saving.
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({ error: `Language ${language} is not supported` });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        if (results[i].status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    // 3. A single insert, only after everything has been validated.
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: "true",
      message: "Problem Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};

// Never send hidden test cases or reference solutions to non-admins.
const sanitizeProblem = (problem, isAdmin) => {
  if (!problem) return problem;

  const { referenceSolutions, testcases, ...rest } = problem;
  const testcaseCount = Array.isArray(testcases) ? testcases.length : 0;

  if (isAdmin) {
    return { ...rest, testcases, referenceSolutions, testcaseCount };
  }

  const samples = Array.isArray(testcases) ? testcases.filter((tc) => tc.isSample === true) : [];
  return { ...rest, testcases: samples.length > 0 ? samples : testcases.slice(0, 1), testcaseCount };
};

export const getAllProblems = async (req,res) => {
   try{
      
    const problems = await db.problem.findMany(
      {
        include:{
          solvedBy:{
            where:{
              userId:req.user.id
            }
          }
        }
      }
    );
// findMany --> use to search with any parametrs
    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message Fetched Successfully",
      problems: problems.map((problem) => sanitizeProblem(problem, req.user.role === "ADMIN")),
    });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         error:"Error while fetching Problems"
      })
   }
}

// ----->
export const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
// findUnique --> for uniquely find question

    if (!problem) {
      return res.status(404).json(
         { error: "Problem not found." });
    }

    return res.status(200).json(
      {
      success: true,
      message: "Message Created Successfully",
      problem: sanitizeProblem(problem, req.user.role === "ADMIN"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problem by id",
    });
  }
};

export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // Check admin role
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to update problems"
    });
  }

  try {
    // Check if problem exists
    const existingProblem = await db.problem.findUnique({
      where: { id }
    });

    if (!existingProblem) {
      return res.status(404).json({
        error: "Problem not found"
      });
    }

    // Validate reference solutions
     if (!referenceSolutions || typeof referenceSolutions !== "object" || Array.isArray(referenceSolutions)) {
  return res.status(400).json({
    error: "referenceSolutions must be a non-empty object"
    });
    }
   if (!Array.isArray(testcases) || testcases.length === 0) {
  return res.status(400).json({
    error: "testcases must be a non-empty array"
  });
}

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      
      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`
        });
      }

      // Test each solution against testcases-- destructure input and output
      const submissions = testcases.map(({input, output}) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output
      }));

      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);

      //polling
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result ---- ", result)
        
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`
          });
        }
      }
    }

    // Update problem after validation
    const updatedproblem = await db.problem.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      }
    });

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedproblem
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while updating problem"
    });
  }
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(404).json(
         { error: "Problem Not found" });
    }

    await db.problem.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error while deleting the problem",
    });
  }
};


export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where:{
        solvedBy:{
          some:{
            userId:req.user.id
          }
        } // some - anyone is true then use
      },
      include:{
        solvedBy:{
          where:{
            userId:req.user.id
          }
        }
      }
    })

    res.status(200).json({
      success:true,
      message:"Problems fetched successfully",
      problems: problems.map((problem) => sanitizeProblem(problem, req.user.role === "ADMIN"))
    })
  } catch (error) {
    console.error("Error fetching problems :" , error);
    res.status(500).json({error:"Failed to fetch problems"})
  }
};

