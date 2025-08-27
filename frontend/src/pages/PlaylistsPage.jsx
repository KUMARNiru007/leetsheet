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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--leetsheet-bg-primary)" }}>
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin mx-auto" style={{ borderColor: "var(--leetsheet-orange)" }}></div>
          <p className="text-lg font-semibold" style={{ color: "var(--leetsheet-text-primary)" }}>Fetching playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 mt-10" style={{ 
      backgroundColor: "var(--leetsheet-bg-primary)", 
      color: "var(--leetsheet-text-primary)" 
    }}>
      {/* Heading */}
      <div className="flex flex-row items-center justify-center w-full mb-8 space-x-4">
        <Code2Icon className="w-12 h-12 rounded-xl p-2" style={{ 
          color: "var(--leetsheet-text-primary)", 
          backgroundColor: "var(--leetsheet-bg-tertiary)" 
        }} />
        <h1 className="text-5xl font-extrabold" style={{ 
          color: "var(--leetsheet-orange)", 
          fontWeight: "var(--font-weight-bold)" 
        }}>
          DSA Sheets
        </h1>
      </div>

      <div className="text-2xl font-semibold text-center mb-12 w-full" style={{ color: "var(--leetsheet-text-secondary)" }}>
        Master Data Structures & Algorithms with curated problem sets. From
        beginner-friendly challenges to advanced company-specific questions.
      </div>

      {playlists.length === 0 ? (
        <div className="text-center" style={{ color: "var(--leetsheet-text-muted)" }}>
          <BookOpen className="mx-auto w-12 h-12 mb-4" />
          <p>No playlists found. Start by creating one!</p>
        </div>
      ) : (
        <>
          {/* === User Playlists === */}
          {userPlaylists.length > 0 && (
            <div className="w-full mb-16">
              <div className="text-4xl font-bold mb-8 flex items-center gap-3" style={{ 
                color: "var(--leetsheet-text-primary)", 
                fontWeight: "var(--font-weight-bold)" 
              }}>
                <Users className="w-8 h-8" style={{ color: "var(--leetsheet-orange)" }} />
                Your Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="card-leetsheet relative rounded-xl p-6 transition-all duration-300"
                    style={{ 
                      borderColor: "var(--leetsheet-border-primary)",
                      transform: "scale(1)",
                      ':hover': {
                        transform: "scale(1.02)"
                      }
                    }}
                  >
                    <div className="text-lg mb-4">
                      <span style={{ color: "var(--leetsheet-orange)" }} className="text-xl">&lt;&gt;</span>
                    </div>
                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{ 
                      backgroundColor: "var(--leetsheet-bg-tertiary)", 
                      color: "var(--leetsheet-orange)",
                      border: "1px solid var(--leetsheet-border-primary)" 
                    }}>
                      Sheet {index + 1}
                    </div>
                    <h2 className="text-xl font-bold mb-3 capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                      {playlist.name}
                    </h2>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
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
                        className="btn-leetsheet-primary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(playlist);
                        }}
                        className="btn-leetsheet-secondary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
                        style={{ 
                          backgroundColor: "var(--leetsheet-btn-danger)", 
                          color: "var(--leetsheet-text-primary)",
                          border: "1px solid var(--leetsheet-border-primary)" 
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Create New Sheet Card */}
                <div className="card-leetsheet relative rounded-xl p-6 transition-all duration-300" style={{ 
                  borderStyle: "dashed", 
                  borderColor: "var(--leetsheet-border-primary)" 
                }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--leetsheet-bg-tertiary)" }}>
                      <Plus className="w-5 h-5" style={{ color: "var(--leetsheet-text-primary)" }} />
                    </div>
                    <h2 className="text-xl font-bold capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                      Create New Sheet
                    </h2>
                  </div>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
                    Build your own curated problems sheet
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn-leetsheet-secondary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
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
            <div className="w-full mb-16">
              <div className="text-4xl font-bold mb-8 flex items-center gap-3" style={{ 
                color: "var(--leetsheet-text-primary)", 
                fontWeight: "var(--font-weight-bold)" 
              }}>
                <Building2 className="w-8 h-8" style={{ color: "var(--leetsheet-orange)" }} />
                Company Based Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="card-leetsheet relative rounded-xl p-6 transition-all duration-300"
                  >
                    {/* Company Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ 
                        backgroundColor: "var(--leetsheet-bg-tertiary)", 
                        border: "1px solid var(--leetsheet-border-primary)" 
                      }}>
                        <Building2 className="w-5 h-5" style={{ color: "var(--leetsheet-orange)" }} />
                      </div>
                      <span style={{ color: "var(--leetsheet-orange)" }} className="text-xl">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{ 
                      backgroundColor: "var(--leetsheet-bg-tertiary)", 
                      color: "var(--leetsheet-orange)",
                      border: "1px solid var(--leetsheet-border-primary)" 
                    }}>
                      Company Sheet
                    </div>
                    <h2 className="text-xl font-bold mb-3 capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                      {playlist.name}
                    </h2>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
                      {playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <button
                        onClick={() => navigate(`/Playlist/${playlist.id}`)}
                        className="btn-leetsheet-primary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(playlist);
                          }}
                          className="btn-leetsheet-secondary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
                          style={{ 
                            backgroundColor: "var(--leetsheet-btn-danger)", 
                            color: "var(--leetsheet-text-primary)",
                            border: "1px solid var(--leetsheet-border-primary)" 
                          }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ 
          backgroundColor: "var(--leetsheet-bg-overlay)", 
          backdropFilter: "blur(4px)" 
        }}>
          <div className="rounded-xl p-6 w-full max-w-md shadow-2xl relative" style={{ 
            backgroundColor: "var(--leetsheet-bg-secondary)", 
            border: "1px solid var(--leetsheet-border-primary)" 
          }}>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 transition-colors"
              style={{ 
                color: "var(--leetsheet-text-muted)", 
                ':hover': { color: "var(--leetsheet-text-primary)" } 
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--leetsheet-text-primary)" }}>
              Delete Playlist
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--leetsheet-text-secondary)" }}>
              Are you sure you want to delete{" "}
              <span style={{ color: "var(--leetsheet-orange)", fontWeight: "var(--font-weight-semibold)" }}>
                "{selectedPlaylist.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="btn-leetsheet-secondary px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ 
                  backgroundColor: "var(--leetsheet-btn-danger)", 
                  color: "var(--leetsheet-text-primary)" 
                }}
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
