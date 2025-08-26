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
        {/* Test Case Tabs */}

        {/* Individual Test Case Result Display */}
        
      </div>
    </div>
  );
};

export default SubmissionResults;
