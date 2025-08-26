import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  ArrowRight,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const [activeTestCase, setActiveTestCase] = useState(0);

  if (!submission) {
    return (
      <div className="p-4 text-center" style={{ color: 'var(--leetsheet-text-muted)' }}>
        No submission data available
      </div>
    );
  }

  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  const avgMemory = memoryArr.length > 0
    ? memoryArr.map(parseFloat).reduce((a, b) => a + b, 0) / memoryArr.length
    : 0;

  const avgTime = timeArr.length > 0
    ? timeArr.map(parseFloat).reduce((a, b) => a + b, 0) / timeArr.length
    : 0;

  const testcases = submission.testcases || [];
  const passedTests = testcases.filter((tc) => tc?.passed).length;
  const totalTests = testcases.length;
  const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
            icon: <Clock className="w-3 h-3" />,
          },
          {
            label: "Avg. Memory",
            value: `${avgMemory.toFixed(0)} KB`,
            style: { color: "var(--leetsheet-orange)" },
            icon: <Memory className="w-3 h-3" />,
          },
        ].map((card, idx) => (
          <div key={idx} className="p-3 rounded-lg border" style={{ 
            backgroundColor: 'var(--leetsheet-bg-secondary)',
            borderColor: 'var(--leetsheet-border-primary)'
          }}>
            <h3 className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: "var(--leetsheet-text-secondary)" }}>
              {card.icon}
              {card.label}
            </h3>
            <div className="text-lg font-bold" style={card.style}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Test Case Results Section */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--leetsheet-text-primary)' }}>
          Test Case Results
        </h2>

        {/* Test Case Tabs */}
        <div className="flex gap-1 mb-3 pb-2 flex-shrink-0" style={{ borderColor: 'var(--leetsheet-border-primary)'}}>
          <div className="flex gap-2 flex-wrap flex-1">
            {testcases.map((testCase, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestCase(idx)}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
                  activeTestCase === idx
                    ? "shadow-sm transform scale-105"
                    : "hover:scale-102"
                }`}
                style={{
                  backgroundColor: activeTestCase === idx
                    ? testCase?.passed 
                      ? 'var(--leetsheet-success)' 
                      : 'var(--leetsheet-error)'
                    : 'var(--leetsheet-bg-tertiary)',
                  color: activeTestCase === idx
                    ? 'var(--leetsheet-bg-primary)'
                    : 'var(--leetsheet-text-primary)'
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: activeTestCase === idx
                      ? 'rgba(0, 0, 0, 0.3)'
                      : testCase?.passed 
                        ? 'var(--leetsheet-success)' 
                        : 'var(--leetsheet-error)'
                  }}
                />
                Case {idx + 1}
              </button>
            ))}
          </div>
          <div className="text-xs flex items-center flex-shrink-0" style={{ color: 'var(--leetsheet-text-muted)' }}>
            {testcases.length} test{testcases.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Individual Test Case Result Display */}
        {testcases[activeTestCase] && (
          <div className="flex-1 rounded-lg p-3 space-y-3 border overflow-y-auto" style={{
            background: 'var(--leetsheet-bg-primary)',
            borderColor: 'var(--leetsheet-bg-tertiary)'
          }}>
            {/* Status Section */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                  backgroundColor: testcases[activeTestCase]?.passed 
                    ? 'var(--leetsheet-success)/20' 
                    : 'var(--leetsheet-error)/20' 
                }}>
                  {testcases[activeTestCase]?.passed ? (
                    <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--leetsheet-success)' }} />
                  ) : (
                    <XCircle className="w-3 h-3" style={{ color: 'var(--leetsheet-error)' }} />
                  )}
                </div>
                <span className="font-semibold text-xs" style={{ 
                  color: testcases[activeTestCase]?.passed 
                    ? 'var(--leetsheet-success)' 
                    : 'var(--leetsheet-error)' 
                }}>
                  Status: {testcases[activeTestCase]?.passed ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>

            {/* Output Section */}
            <div className="group">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-info)/20' }}>
                  <CheckCircle className="w-3 h-3" style={{ color: 'var(--leetsheet-info)' }} />
                </div>
                <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-info)' }}>
                  Output
                </span>
              </div>
              <div className="p-2 rounded-md border transition-colors" style={{
                backgroundColor: 'var(--leetsheet-bg-secondary)',
                borderColor: 'var(--leetsheet-bg-tertiary)'
              }}>
                <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                  {testcases[activeTestCase]?.stdout || "null"}
                </code>
              </div>
            </div>

            {/* Expected Output Section */}
            <div className="group">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-warning)/20' }}>
                  <ArrowRight className="w-3 h-3" style={{ color: 'var(--leetsheet-warning)' }} />
                </div>
                <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-warning)' }}>
                  Expected Output
                </span>
              </div>
              <div className="p-2 rounded-md border transition-colors" style={{
                backgroundColor: 'var(--leetsheet-bg-secondary)',
                borderColor: 'var(--leetsheet-bg-tertiary)'
              }}>
                <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                  {testcases[activeTestCase]?.expected || 'N/A'}
                </code>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {/* Runtime */}
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-warning)/20' }}>
                    <Clock className="w-2 h-2" style={{ color: 'var(--leetsheet-warning)' }} />
                  </div>
                  <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-warning)' }}>
                    Runtime
                  </span>
                </div>
                <div className="p-2 rounded-md border transition-colors" style={{
                  backgroundColor: 'var(--leetsheet-bg-secondary)',
                  borderColor: 'var(--leetsheet-bg-tertiary)'
                }}>
                  <code className="font-mono text-xs" style={{ color: 'var(--leetsheet-text-primary)' }}>
                    {testcases[activeTestCase]?.time || 'N/A'} s
                  </code>
                </div>
              </div>

              {/* Memory */}
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-orange)/20' }}>
                    <Memory className="w-2 h-2" style={{ color: 'var(--leetsheet-orange)' }} />
                  </div>
                  <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-orange)' }}>
                    Memory
                  </span>
                </div>
                <div className="p-2 rounded-md border transition-colors" style={{
                  backgroundColor: 'var(--leetsheet-bg-secondary)',
                  borderColor: 'var(--leetsheet-bg-tertiary)'
                }}>
                  <code className="font-mono text-xs" style={{ color: 'var(--leetsheet-text-primary)' }}>
                    {testcases[activeTestCase]?.memory || 'N/A'} KB
                  </code>
                </div>
              </div>
            </div>

            {/* Error Message (if failed) */}
            {!testcases[activeTestCase]?.passed && testcases[activeTestCase]?.stderr && (
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-error)/20' }}>
                    <XCircle className="w-2 h-2" style={{ color: 'var(--leetsheet-error)' }} />
                  </div>
                  <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-error)' }}>
                    Error
                  </span>
                </div>
                <div className="p-2 rounded-md border transition-colors" style={{
                  backgroundColor: 'var(--leetsheet-bg-secondary)',
                  borderColor: 'var(--leetsheet-error)/20'
                }}>
                  <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-error)' }}>
                    {testcases[activeTestCase].stderr}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionResults;
