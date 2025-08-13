import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus, Search, Filter } from "lucide-react";
import { useActions } from "../store/useAction";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModel";
import { usePlaylistStore } from "../store/usePlaylistStore";

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

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
  const itemsPerPage = 6;
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY": return "text-green-600 bg-green-100 border-green-200";
      case "MEDIUM": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "HARD": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header with Create Playlist Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Problems</h2>
          <p className="text-gray-600">Master coding challenges and track your progress</p>
        </div>
        <button
          className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/20 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems by title..."
              className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select
              className="select select-bordered bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="ALL">All Difficulties</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            
            <select
              className="select select-bordered bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="ALL">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedProblems.length > 0 ? (
          paginatedProblems.map((problem) => {
            const isSolved = problem.solvedBy.some(
              (user) => user.userId === authUser?.id
            );
            return (
              <div key={problem.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <div className="flex items-center gap-2">
                      {isSolved && (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    <Link to={`/problem/${problem.id}`}>
                      {problem.title}
                    </Link>
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(problem.tags || []).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {(problem.tags || []).length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{(problem.tags || []).length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      {authUser?.role === "ADMIN" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(problem.id)}
                            className="btn btn-sm btn-error btn-outline hover:bg-red-50"
                            title="Delete Problem"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                          <button 
                            disabled 
                            className="btn btn-sm btn-warning btn-outline hover:bg-yellow-50"
                            title="Edit Problem"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary hover:bg-blue-50"
                        onClick={() => handleAddToPlaylist(problem.id)}
                        title="Save to Playlist"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/problem/${problem.id}`}
                        className="btn btn-sm btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                      >
                        Solve
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 bg-white rounded-2xl shadow-lg border border-gray-200/20 p-4">
          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

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