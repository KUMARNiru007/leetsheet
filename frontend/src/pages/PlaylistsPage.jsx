import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore.js";
import {
  BookOpen,
  FolderOpen,
  Trash2,
  X,
  Code2Icon,
  Plus,
  CloudLightningIcon,
  Building2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreatePlaylistModal from "../components/CreatePlaylistModal.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const Playlists = () => {
  const navigate = useNavigate();
  const { playlists, getAllPlaylists, deletePlaylist, createPlaylist } =
    usePlaylistStore();

  const { authUser, checkAuth } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      await getAllPlaylists();
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const userPlaylists = playlists.filter((p) => !p.isPublic);
  const adminPlaylists = playlists.filter((p) => p.isPublic);

  const isAdmin = authUser?.role === "ADMIN";

  const openModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlaylist(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    await deletePlaylist(selectedPlaylist.id);
    closeModal();
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-yellow-400 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-semibold">Fetching playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-black via-zinc-900 to-black text-white mt-10">
      {/* Heading */}
      <div className="flex flex-row items-center justify-center w-full mb-8 space-x-4">
        <Code2Icon className="w-12 h-12 text-white bg-zinc-800 rounded-xl p-2" />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          DSA Sheets
        </h1>
      </div>

      <div className="text-2xl font-semibold text-center mb-12 mx-auto max-w-3xl text-gray-300">
        Master Data Structures & Algorithms with curated problem sets. From
        beginner-friendly challenges to advanced company-specific questions.
      </div>

      {playlists.length === 0 ? (
        <div className="text-center text-gray-400">
          <BookOpen className="mx-auto w-12 h-12 mb-4" />
          <p>No playlists found. Start by creating one!</p>
        </div>
      ) : (
        <>
          {/* === User Playlists === */}
          {userPlaylists.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-yellow-400" />
                Your Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl border border-purple-500/50 p-6 bg-zinc-900/80 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="text-lg text-white mb-4">
                      <span className="text-purple-300 text-xl">&lt;&gt;</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                      Sheet {index + 1}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 capitalize">
                      {playlist.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                      {playlist.description?.toLowerCase() ===
                      "after solving this problem you can able to solve any js problem"
                        ? "After solving these problems, you'll be able to solve any JS problem"
                        : playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/Playlist/${playlist.id}`);
                        }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 rounded-lg flex justify-center items-center gap-2 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(playlist);
                        }}
                        className="w-full bg-red-500/20 text-red-400 font-semibold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Create New Sheet Card */}
                <div className="relative rounded-xl border border-dashed border-zinc-500/50 p-6 bg-zinc-900/60 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white capitalize">
                      Create New Sheet
                    </h2>
                  </div>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    Build your own curated problems sheet
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full border border-dashed border-zinc-500/50 text-zinc-400 hover:text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-800/50"
                  >
                    <CloudLightningIcon className="w-5 h-5" />
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === Admin Public Playlists === */}
          {adminPlaylists.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-400" />
                Company Based Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl border border-blue-500/50 p-6 bg-zinc-900/80 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
                  >
                    {/* Company Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <Building2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-blue-300 text-xl">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                      Company Sheet
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 capitalize">
                      {playlist.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                      {playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <button
                        onClick={() => navigate(`/Playlist/${playlist.id}`)}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 rounded-lg flex justify-center items-center gap-2 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(playlist);
                          }}
                          className="w-full bg-red-500/20 text-red-400 font-semibold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                        >
                          <Trash2 className="w-5 h-5" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      {isModalOpen && selectedPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-zinc-700/50 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4 text-white">
              Delete Playlist
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-yellow-400 font-semibold">
                "{selectedPlaylist.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default Playlists;
