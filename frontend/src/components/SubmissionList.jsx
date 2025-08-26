import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

const SubmissionList = ({ submissions, isLoading }) => {
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error Parsing Data: ",error);
      return [];
    }
  };

  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );

    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );

    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
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
      <div className="p-8" style={{ textAlign: "center", }}>
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
            const avgMemory = calculateAverageMemory(submission.memory);
            const avgTime = calculateAverageTime(submission.time);
            const statusClass =
              submission.status === "Accepted"
                ? "badge-leetsheet success"
                : submission.status === "Compile Error"
                ? "badge-leetsheet error"
                : "badge-leetsheet warning";

            return (
              <tr key={submission.id}>
                <td>{submissions.length - index}</td>
                <td>
                  <span className={statusClass}>{submission.status}</span>
                </td>
                <td>
                  <span className="badge-leetsheet">{submission.language}</span>
                </td>
                <td>{avgTime !== null ? `${avgTime.toFixed(0)} ms` : "N/A"}</td>
                <td>{avgMemory !== null ? `${avgMemory.toFixed(1)} MB` : "N/A"}</td>
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
