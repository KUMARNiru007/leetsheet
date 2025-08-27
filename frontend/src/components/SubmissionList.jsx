import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

const SubmissionList = ({ submissions, isLoading, onSubmissionSelect }) => {
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error Parsing Data: ", error);
      return [];
    }
  };

  if (isLoading) {
    return (
      <div className="p-8" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span className="loading">Loading...</span>
      </div>
    );
  }

  if (!submissions?.length) {
    return (
      <div className="p-8" style={{ textAlign: "center" }}>
        <div style={{ color: "var(--leetsheet-text-secondary)" }}>No Submissions Found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
      <table className="table-leetsheet" style={{ width: "100%", fontSize: "var(--font-size-sm)" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>#</th>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Status</th>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>Language</th>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Clock className="w-4 h-4" />
                Runtime
              </div>
            </th>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Memory className="w-4 h-4" />
                Memory
              </div>
            </th>
            <th style={{ backgroundColor: 'var(--leetsheet-bg-primary)'}}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Calendar className="w-4 h-4" />
                Date
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...submissions].reverse().map((submission, index) => {
            const memoryArr = safeParse(submission.memory || "[]");
            const timeArr = safeParse(submission.time || "[]");

            const avgMemory = memoryArr.length > 0
              ? memoryArr.map(m => parseFloat(m)).reduce((a, b) => a + b, 0) / memoryArr.length
              : 0;

            const avgTime = timeArr.length > 0
              ? timeArr.map(t => parseFloat(t)).reduce((a, b) => a + b, 0) / timeArr.length
              : 0;

            const statusClass =
              submission.status === "Accepted"
                ? "badge-leetsheet success"
                : submission.status === "Compile Error"
                ? "badge-leetsheet error"
                : "badge-leetsheet warning";

            return (
              <tr 
                key={submission.id}
                onClick={() => onSubmissionSelect && onSubmissionSelect(submission)}
                className="cursor-pointer hover:bg-opacity-80 transition-colors"
                style={{ 
                  backgroundColor: 'var(--leetsheet-bg-secondary)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--leetsheet-bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--leetsheet-bg-secondary)';
                }}
              >
                <td>{submissions.length - index}</td>
                <td>
                  <span className={statusClass}>{submission.status}</span>
                </td>
                <td>
                  <span className="badge-leetsheet">{submission.language}</span>
                </td>
                <td>{avgTime > 0 ? `${avgTime.toFixed(3)} s` : "N/A"}</td>
                <td>{avgMemory > 0 ? `${avgMemory.toFixed(0)} KB` : "N/A"}</td>
                <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;