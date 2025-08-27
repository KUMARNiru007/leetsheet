import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, TrashIcon, Plus, Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useAction } from "../store/useAction.js";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { usePlaylistStore } from "../store/usePlaylistStore";

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useAction();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Known company tags
  const companyTags = ["Google", "Amazon", "Netflix", "Microsoft", "Facebook", "Apple"];

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const toggleRowExpansion = (problemId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(problemId)) {
      newExpandedRows.delete(problemId);
    } else {
      newExpandedRows.add(problemId);
    }
    setExpandedRows(newExpandedRows);
  };

  // Function to separate company tags from other tags
  const separateTags = (tags) => {
    const companies = [];
    const otherTags = [];
    
    tags.forEach(tag => {
      if (companyTags.includes(tag)) {
        companies.push(tag);
      } else {
        otherTags.push(tag);
      }
    });
    
    return { companies, otherTags };
  };

  return (
    <div className="w-full">
      {/* Header and Filters */}
      <div className="card-leetsheet mb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="h2">Practice Problems</h2>
          <button
            className="btn-leetsheet-primary gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Sheets
          </button>
        </div>

        <div className="mt-1">
          <div className="relative w-70">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search sheets or tags..."
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-600 bg-[#1f1f1f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table-leetsheet w-full">
          <thead>
            <tr>
              <th className="w-0">Status</th>
              <th>Problems</th>
              <th className="w-40">Tags</th>
              <th className="w-28">Difficulty</th>
              <th className="w-40">Add to Sheets</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                const isExpanded = expandedRows.has(problem.id);
                const { companies, otherTags } = separateTags(problem.tags || []);
                
                // Show only first 2 company tags initially, or all if expanded
                const visibleCompanies = isExpanded ? companies : companies.slice(0, 2);
                const hiddenCompaniesCount = companies.length - visibleCompanies.length;
                
                // Show only first 2 other tags initially, or all if expanded
                const visibleOtherTags = isExpanded ? otherTags : otherTags.slice(0, 2);
                const hiddenOtherTagsCount = otherTags.length - visibleOtherTags.length;
                
                return (
                  <tr key={problem.id} className="h-8">
                    <td className="py-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSolved 
                          ? 'border-2 border-[#404040] bg-[#2d2d2d]' 
                          : 'border-2 border-[#404040] bg-[#2d2d2d]'
                      }`}>
                        {isSolved && <Check className="w-5 h-5 text-green-600" />}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Link 
                          to={`/problem/${problem.id}`} 
                          className="font-semibold  
                          text-[var(--leetsheet-text-primary)] hover:text-[var(--leetsheet-orange)] transition-colors truncate max-w-xs"
                        >
                          {problem.title}
                        </Link>
                        {companies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {visibleCompanies.map((company, idx) => (
                              <span
                                key={idx}
                                className="badge-leetsheet-company text-xs font-bold"
                              >
                                {company}
                              </span>
                            ))}
                            {!isExpanded && hiddenCompaniesCount > 0 && (
                              <button
                                onClick={() => toggleRowExpansion(problem.id)}
                                className="badge-leetsheet-more text-xs font-bold"
                              >
                                +{hiddenCompaniesCount} more
                              </button>
                            )}
                          </div>
                        )}
                        {isExpanded && companies.length > 0 && (
                          <button 
                            onClick={() => toggleRowExpansion(problem.id)}
                            className="flex items-center text-xs text-gray-400 mt-1"
                          >
                            Show less <ChevronUp className="w-3 h-3 ml-1" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap gap-1">
                          {visibleOtherTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="badge-leetsheet text-xs font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                          {!isExpanded && hiddenOtherTagsCount > 0 && (
                            <button
                              onClick={() => toggleRowExpansion(problem.id)}
                              className="badge-leetsheet-more text-xs font-bold"
                            >
                              +{hiddenOtherTagsCount} more
                            </button>
                          )}
                        </div>
                        {isExpanded && otherTags.length > 0 && (
                          <button 
                            onClick={() => toggleRowExpansion(problem.id)}
                            className="flex items-center text-xs text-orange-300 mt-1"
                          >
                            Show less <ChevronUp className="w-3 h-3 ml-1 text-orange-300" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge-leetsheet font-semibold text-xs ${
                          problem.difficulty === "EASY"
                            ? "success"
                            : problem.difficulty === "MEDIUM"
                            ? "warning"
                            : "error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="btn-leetsheet-danger btn-sm"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                            <button disabled className="btn-leetsheet-secondary btn-sm">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark
                            className="w-5 h-5 ml-8 text-gray-400 transition-all duration-200 
                                       hover:text-orange-300 hover:scale-110 cursor-pointer"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[#8c8c8c]">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn-leetsheet-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn-leetsheet-secondary btn-sm bg-[#3c3c3c] text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn-leetsheet-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;