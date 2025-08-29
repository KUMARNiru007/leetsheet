import React, { useEffect, useState, useMemo } from "react";
import { Loader, Filter, X } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ProblemsTable from "../components/ProblemTable.jsx";

function AllProblems() {
  const { authUser } = useAuthStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");

  // Mock company data
  const companies = ["Google", "Microsoft", "Amazon", "Facebook", "Apple", "Netflix"];
  
  // Topic categories
  const topics = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Math", "Hash Table", "Sorting"];

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Filter problems based on selected companies, topics, and difficulty
  const filteredProblems = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    
    return problems.filter(problem => {
      // Filter by companies
      const companyMatch = selectedCompanies.length === 0 || 
        selectedCompanies.some(company => 
          problem.tags?.some(tag => tag.toLowerCase().includes(company.toLowerCase()))
        );
      
      // Filter by topics
      const topicMatch = selectedTopics.length === 0 || 
        selectedTopics.some(topic => 
          problem.tags?.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
        );
      
      // Filter by difficulty
      const difficultyMatch = selectedDifficulty === "ALL" || 
        problem.difficulty === selectedDifficulty;
      
      return companyMatch && topicMatch && difficultyMatch;
    });
  }, [problems, selectedCompanies, selectedTopics, selectedDifficulty]);

  const toggleCompany = (company) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setSelectedCompanies([]);
    setSelectedTopics([]);
    setSelectedDifficulty("ALL");
  };

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin loading" />
      </div>
    );
  }

  return (
     <div className="flex flex-col md:flex-row min-h-screen  py-1 gap-2">
      {/* Mobile filter toggle - increased width */}
      <div className="md:hidden flex justify-between items-center mb-4 w-full">
        <h1 className="text-2xl font-bold">Problems</h1>
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--leetsheet-primary)] text-white rounded-lg"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block md:w-1/4 bg-[#2a2a2a] rounded-xl p-4 shadow-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button 
            onClick={clearFilters}
            className="text-sm text-[var(--leetsheet-orange)] hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* Difficulty filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Difficulty</h3>
          <div className="flex flex-col gap-2">
            {["ALL", "Easy", "Medium", "Hard"].map(diff => (
              <label key={diff} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  checked={selectedDifficulty === diff}
                  onChange={() => setSelectedDifficulty(diff)}
                  className="w-4 h-4 text-[var(--leetsheet-orange)]"
                />
                <span className={selectedDifficulty === diff ? "text-[var(--leetsheet-orange)]" : ""}>
                  {diff === "ALL" ? "All Difficulties" : diff}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Companies filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Companies</h3>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {companies.map(company => (
              <label key={company} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company)}
                  onChange={() => toggleCompany(company)}
                  className="w-4 h-4 text-[var(--leetsheet-orange)]"
                />
                <span className={selectedCompanies.includes(company) ? "text-[var(--leetsheet-orange)]" : ""}>
                  {company}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Topics filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Topics</h3>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {topics.map(topic => (
              <label key={topic} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  className="w-4 h-4 text-[var(--leetsheet-orange)]"
                />
                <span className={selectedTopics.includes(topic) ? "text-[var(--leetsheet-orange)]" : ""}>
                  {topic}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Active filters indicator */}
        {(selectedCompanies.length > 0 || selectedTopics.length > 0 || selectedDifficulty !== "ALL") && (
          <div className="mt-4 p-3 bg-[#3a3a3a] rounded-lg">
            <p className="text-sm font-medium mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedDifficulty !== "ALL" && (
                <span className="badge-leetsheet success text-xs">{selectedDifficulty}</span>
              )}
              {selectedCompanies.map(company => (
                <span key={company} className="badge-leetsheet warning text-xs">{company}</span>
              ))}
              {selectedTopics.map(topic => (
                <span key={topic} className="badge-leetsheet text-xs">{topic}</span>
              ))}
            </div>
          </div>
        )}
      </div>

     {/* Main content - increased width */}
      <div className="flex-1 w-full">
        <div className="w-full max-w-none"> 
          {filteredProblems.length > 0 ? (
            <ProblemsTable problems={filteredProblems} />
          ) : (
            <div className="card-leetsheet text-center">
              <p className="text-[var(--leetsheet-text-muted)] font-medium">
                {problems.length === 0 ? "No problems found." : "No problems match your filters."}
              </p>
              {(selectedCompanies.length > 0 || selectedTopics.length > 0 || selectedDifficulty !== "ALL") && (
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-[var(--leetsheet-primary)] text-white rounded-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProblems;