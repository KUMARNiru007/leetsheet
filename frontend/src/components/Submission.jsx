import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  const avgMemory =
    memoryArr.map(parseFloat).reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr.map(parseFloat).reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testcases.filter((tc) => tc.passed).length;
  const totalTests = submission.testcases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Status",
            value: submission.status,
            style: {
              color:
                submission.status === "Accepted"
                  ? "var(--leetsheet-success)"
                  : "var(--leetsheet-error)",
            },
          },
          {
            label: "Success Rate",
            value: `${successRate.toFixed(1)}%`,
            style: { color: "var(--leetsheet-info)" },
          },
          {
            label: "Avg. Runtime",
            value: `${avgTime.toFixed(3)} s`,
            style: { color: "var(--leetsheet-warning)" },
            icon: <Clock className="w-4 h-4" />,
          },
          {
            label: "Avg. Memory",
            value: `${avgMemory.toFixed(0)} KB`,
            style: { color: "var(--leetsheet-orange)" },
            icon: <Memory className="w-4 h-4" />,
          },
        ].map((card, idx) => (
          <div key={idx} className="card-leetsheet">
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--leetsheet-text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {card.icon}
              {card.label}
            </h3>
            <div className="text-xl font-bold" style={card.style}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Test Cases Results */}
      <div className="card-leetsheet" style={{ padding: "1.5rem" }}>
        <h2 className="h2" style={{ marginBottom: "1rem" }}>Test Case Results</h2>

        <div className="overflow-x-auto" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
          <table className="table-leetsheet" style={{ width: "100%", fontSize: "var(--font-size-sm)" }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Status</th>
                <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Expected Output</th>
                <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Your Output</th>
                <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Memory</th>
                <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Time</th>
              </tr>
            </thead>
            <tbody>
              {submission.testcases.map((testCase) => (
                <tr key={testCase.id}>
                  <td>
                    <span className={testCase.passed ? "badge-leetsheet success" : "badge-leetsheet error"} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      {testCase.passed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Passed
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Failed
                        </>
                      )}
                    </span>
                  </td>
                  <td className="font-mono whitespace-pre-wrap">
                    {testCase.expected}
                  </td>
                  <td className="font-mono whitespace-pre-wrap">
                    {testCase.stdout || "null"}
                  </td>
                  <td className="text-center">{testCase.memory}</td>
                  <td className="text-center">{testCase.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
