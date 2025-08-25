import React, { useEffect } from "react";
import { Loader } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";

import { useAuthStore } from "../store/useAuthStore.js";
import ProblemsTable from "../components/ProblemTable.jsx";


function AllProblems() {
  const { authUser } = useAuthStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center  px-4">
      <div className="max-w-6xl w-full flex flex-col items-center text-center">
        <h1 className="h1">
          Hi, {authUser?.name}
          <span className="block text-[var(--leetsheet-orange)]">Welcome to LeetSheet</span>
        </h1>
        <p className="text-xl md:text-2xl mt-4 text-[var(--leetsheet-text-secondary)] font-medium tracking-wide">
          Let's start solving the best coding problems from top organizations
        </p>
      </div>

      <div className="max-w-6xl w-full mt-10">
        {problems.length > 0 ? (
          <ProblemsTable problems={problems} />
        ) : (
          <div className="card-leetsheet text-center">
            <p className="text-[var(--leetsheet-text-muted)] font-medium">No problems found.</p>
          </div>
        )}
      </div>
    </div>
  );

}

export default AllProblems;
