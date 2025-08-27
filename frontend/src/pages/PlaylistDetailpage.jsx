import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Circle, Loader2, BookOpen, Filter, X, ChevronUp } from "lucide-react";

import { usePlaylistStore } from "../store/usePlaylistStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useProblemStore } from "../store/useProblemStore.js";

const PlaylistDetailsPage = () => {
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const { currentPlaylist, getPlaylistDetails } = usePlaylistStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id]);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Function to toggle row expansion
  const toggleRowExpansion = (problemId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  // Derive the solved status based on authUser
  const solvedProblems = useMemo(() => {
    if (!authUser || !problems) return [];
    return problems.filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser.id)
    );
  }, [problems, authUser]);

  const problemsWithSolved = useMemo(() => {
    if (!currentPlaylist?.problems) return [];
    return currentPlaylist.problems.map((p) => ({
      ...p,
      solved: solvedProblems.some((sp) => sp.id === p.problem.id),
    }));
  }, [currentPlaylist, solvedProblems]);

  // Extract all unique tags from problems for the sidebar
  const allTags = useMemo(() => {
    if (!problemsWithSolved) return [];
    const tagsSet = new Set();
    problemsWithSolved.forEach((p) => p.problem.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problemsWithSolved]);

  // Filter problems based on selected difficulty and tags
  const filteredProblems = useMemo(() => {
    if (!problemsWithSolved) return [];
    
    return problemsWithSolved.filter(problem => {
      // Filter by difficulty
      const difficultyMatch = selectedDifficulty === "ALL" || 
        problem.problem.difficulty === selectedDifficulty;
      
      // Filter by topics - fixed to use problem.problem.tags
      const topicMatch = selectedTopics.length === 0 || 
        selectedTopics.some(topic => 
          problem.problem.tags?.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
        );
      
      return difficultyMatch && topicMatch;
    });
  }, [problemsWithSolved, selectedDifficulty, selectedTopics]);

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedDifficulty("ALL");
  };

  const isLoading = !currentPlaylist || isProblemsLoading;

  const solved = filteredProblems.filter((p) => p.solved).length;
  const total = filteredProblems.length;
  const solvedPercent = total ? Math.floor((solved / total) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin mx-auto" style={{ color: "var(--leetsheet-orange)" }} />
          <p className="text-lg font-semibold" style={{ color: "var(--leetsheet-text-primary)" }}>Loading problems...</p>
        </div>
      </div>
    );
  }

  return !currentPlaylist ? (
    <div className="text-white p-6 mt-17 flex items-center justify-center ">
      <Loader2 className="animate-spin" /> Loading...
    </div>
  ) : (
    <div>
      {/* Header with Icon */}
      <div className="flex flex-col md:flex-row min-h-screen py-2 gap-2">
        {/* Mobile filter toggle */}
        <div className="md:hidden flex justify-between items-center mb-4 w-full">
          <h1 className="text-2xl font-bold">Playlist Problems</h1>
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
              {[
                { value: "ALL", label: "All Difficulties" },
                { value: "EASY", label: "Easy" },
                { value: "MEDIUM", label: "Medium" },
                { value: "HARD", label: "Hard" }
              ].map(diff => (
                <label key={diff.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={diff.value}
                    checked={selectedDifficulty === diff.value}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-4 h-4 text-[var(--leetsheet-orange)]"
                  />
                  <span className={selectedDifficulty === diff.value ? "text-[var(--leetsheet-orange)]" : ""}>
                    {diff.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

         {/* Topics filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Topics</h3>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {allTags.map(topic => (
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
          {(selectedTopics.length > 0 || selectedDifficulty !== "ALL") && (
            <div className="mt-4 p-3 bg-[#3a3a3a] rounded-lg">
              <p className="text-sm font-medium mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedDifficulty !== "ALL" && (
                  <span className="badge-leetsheet success text-xs">{selectedDifficulty}</span>
                )}
                {selectedTopics.map(topic => (
                  <span key={topic} className="badge-leetsheet text-xs">{topic}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 w-full">
          
          {/* Progress Section */}
          <div className="card-leetsheet mb-2">
            <div className="flex flex-row items-center  w-full mb-3 space-x-4">
        <BookOpen className="w-12 h-12 rounded-xl p-2" style={{ 
          color: "var(--leetsheet-orange)", 
          backgroundColor: "var(--leetsheet-bg-tertiary)" 
        }} />
        <h1 className="text-4xl font-extrabold" style={{ 
          color: "var(--leetsheet-text-primary)", 
          fontWeight: "var(--font-weight-bold)" 
        }}>
          {currentPlaylist.name}
        </h1>
      </div>

      {/* Description */}
      {currentPlaylist.description && (
        <p className="text-xl font-semibold mb-3 w-full" style={{ color: "var(--leetsheet-text-secondary)" }}>
          {currentPlaylist.description}
        </p>
      )}
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-3">

              
              <div>
                <p className="text-base" style={{ color: "var(--leetsheet-text-secondary)" }}>
                  <span style={{ color: "var(--leetsheet-text-primary)", fontWeight: "var(--font-weight-semibold)" }}>
                    {solved}/{total}
                  </span> Problems Solved
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 36 36"
                  >
                    <path
                      style={{ stroke: "var(--leetsheet-border-primary)" }}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                    />
                    <path
                      style={{ stroke: "var(--leetsheet-orange)" }}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      strokeWidth="3"
                      strokeDasharray={`${solvedPercent}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold" style={{ color: "var(--leetsheet-orange)" }}>
                    {solvedPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Difficulty Stats */}
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--leetsheet-text-primary)" }}>
              Difficulty Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 mb-3 gap-2.5">
              {["EASY", "MEDIUM", "HARD"].map((level) => {
                const problemsByLevel = filteredProblems.filter(
                  (p) => p.problem?.difficulty === level
                );
                const solvedByLevel = problemsByLevel.filter((p) => p.solved);

                return (
                  <div
                    key={level}
                    className="p-4 rounded-xl shadow transition-all duration-300"
                    style={{
                      backgroundColor: "var(--leetsheet-bg-secondary)",
                      border: "1px solid var(--leetsheet-border-primary)",
                      borderLeft: `4px solid ${
                        level === "EASY"
                          ? "var(--leetsheet-success)"
                          : level === "MEDIUM"
                          ? "var(--leetsheet-warning)"
                          : "var(--leetsheet-error)"
                      }`
                    }}
                  >
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{
                        color:
                          level === "EASY"
                            ? "var(--leetsheet-success)"
                            : level === "MEDIUM"
                            ? "var(--leetsheet-warning)"
                            : "var(--leetsheet-error)"
                      }}
                    >
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </h3>
                    <p className="text-base" style={{ color: "var(--leetsheet-text-secondary)" }}>
                      <span style={{ color: "var(--leetsheet-text-primary)", fontWeight: "var(--font-weight-semibold)" }}>
                        {solvedByLevel.length}/{problemsByLevel.length}
                      </span> Problems Solved
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Problems List */}
          <div className="card-leetsheet">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--leetsheet-text-primary)" }}>
              Problems
            </h2>
            <div className="flex flex-col ">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem, idx) => {
                  const isExpanded = expandedRows.has(problem.problem.id);
                  const tags = problem.problem.tags || [];
                  
                  const visibleTags = isExpanded ? tags : tags.slice(0, 2);
                  const hiddenTagsCount = tags.length - visibleTags.length;
                  
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 mb-2 rounded-xl "
                      
                      style={{
                        backgroundColor: "var(--leetsheet-bg-secondary)",
                        border: "1px solid var(--leetsheet-border-primary)",
                        ':hover': {
                          backgroundColor: "var(--leetsheet-bg-tertiary)"
                        }
                      }}
                    >
                      <div className="flex items-center gap-4 ">
                        {problem.solved ? (
                          <CheckCircle2 style={{ color: "var(--leetsheet-success)" }} className="w-6 h-6" />
                        ) : (
                          <Circle style={{ color: "var(--leetsheet-text-muted)" }} className="w-6 h-6" />
                        )}
                        <div>
                          <Link
                            to={`/problem/${problem.problem.id}`}
                            className="text-lg font-medium hover:text-orange-400"
                          >
                            {problem.problem.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: 
                                  problem.problem.difficulty === "EASY"
                                    ? "rgba(0, 184, 163, 0.1)"
                                    : problem.problem.difficulty === "MEDIUM"
                                    ? "rgba(255, 192, 30, 0.1)"
                                    : "rgba(255, 55, 95, 0.1)",
                                color:
                                  problem.problem.difficulty === "EASY"
                                    ? "var(--leetsheet-success)"
                                    : problem.problem.difficulty === "MEDIUM"
                                    ? "var(--leetsheet-warning)"
                                    : "var(--leetsheet-error)",
                                border: `1px solid ${
                                  problem.problem.difficulty === "EASY"
                                    ? "var(--leetsheet-success)"
                                    : problem.problem.difficulty === "MEDIUM"
                                    ? "var(--leetsheet-warning)"
                                    : "var(--leetsheet-error)"
                                }`
                              }}
                            >
                              {problem.problem.difficulty}
                            </span>
                            {visibleTags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: "var(--leetsheet-bg-tertiary)",
                                  color: "var(--leetsheet-text-secondary)",
                                  border: "1px solid var(--leetsheet-border-primary)"
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            {!isExpanded && hiddenTagsCount > 0 && (
                              <button
                                onClick={() => toggleRowExpansion(problem.problem.id)}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: "var(--leetsheet-bg-tertiary)",
                                  color: "var(--leetsheet-orange)",
                                  border: "1px solid var(--leetsheet-border-primary)"
                                }}
                              >
                                +{hiddenTagsCount} more
                              </button>
                            )}
                            {isExpanded && tags.length > 2 && (
                              <button 
                                onClick={() => toggleRowExpansion(problem.problem.id)}
                                className="flex items-center text-xs text-orange-300 ml-1"
                              >
                                Show less 
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/problem/${problem.problem.id}`}
                        className="btn-leetsheet-primary px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Solve
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-8">
                  <p className="text-lg" style={{ color: "var(--leetsheet-text-muted)" }}>
                    No problems match your filters.
                  </p>
                  {(selectedTopics.length > 0 || selectedDifficulty !== "ALL") && (
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
      </div>
      </div>
  );
};

export default PlaylistDetailsPage;