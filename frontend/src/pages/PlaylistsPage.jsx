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

import amazonIcon from "./assets/AmazonIcon.webp";
import googleIcon from "./assets/googleIcon.webp";
import microsoftIcon from "./assets/microsoftIcon.webp";

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
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin mx-auto" style={{ borderColor: "var(--leetsheet-orange)" }}></div>
          <p className="text-xl font-semibold" style={{ color: "var(--leetsheet-text-primary)" }}>Loading your sheets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 md:px-8 rounded-xl mt-1 mb-2 pb-12" style={{ 
      backgroundColor: "var(--leetsheet-bg-secondary)", 
      color: "var(--leetsheet-text-primary)",
    }}>
      {/* Heading */}
      <div className="flex flex-col items-center  justify-center w-full mb-12">
        <div className="flex mt-5  items-center justify-center space-x-4 mb-2">
          <h1 className="text-5xl font-extrabold" style={{ 
            color: "var(--leetsheet-text-primary)", 
            fontWeight: "var(--font-weight-bold)",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
          }}>
             Sheets
          </h1>
          
        </div>
        <div className="w-33 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--leetsheet-orange)' }}></div>
        <p className="text-xl font-medium text-center max-w-3xl mx-auto" style={{ color: "var(--leetsheet-text-secondary)" }}>
          Master Data Structures & Algorithms with curated problem sets. From
          beginner-friendly challenges to advanced company-specific questions.
        </p>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-16 bg-opacity-50 rounded-xl" style={{ 
          backgroundColor: "var(--leetsheet-bg-secondary)",
          border: "1px dashed var(--leetsheet-border-primary)"
        }}>
          <BookOpen className="mx-auto w-10 h-10 mb-3 opacity-70" style={{ color: "var(--leetsheet-text-muted)" }} />
          <p className="text-xl font-medium">No Sheets found. Start by creating one!</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-6 btn-leetsheet-primary px-6 py-3 rounded-lg flex items-center mx-auto gap-2 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Create New Sheet
          </button>
        </div>
      ) : (
        <div className="space-y-10">


          {/* === Admin Public Playlists === */}
          {adminPlaylists.length > 0 && (
            <div className="w-full">
              <div className="text-2xl font-bold mb-8 flex items-center gap-3 px-2" style={{ 
                color: "var(--leetsheet-text-primary)", 
                fontWeight: "var(--font-weight-bold)" 
              }}>
                <Building2 className="w-6 h-6" style={{ color: "var(--leetsheet-orange)" }} />
                Company Based Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adminPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: "var(--leetsheet-bg-secondary)",
                      borderLeft: "4px solid var(--leetsheet-info)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {index === 0 && (
                        <img
                          src={googleIcon}
                          alt="Google"
                          className="w-7 h-7 object-contain"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src={microsoftIcon}
                          alt="Microsoft"
                          className="w-7 h-7 object-contain"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src={amazonIcon}
                          alt="Amazon"
                          className="w-7 h-7 object-contain"
                        />
                      )}
                      {/* <img
                        src={flipkartIcon}
                        alt="Flipkart"
                        className="w-7 h-7 object-contain"
                      /> */}
                      <span className="text-blue-300 text-xl ml-2">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full" style={{ 
                      backgroundColor: "#dadada", 
                      color: "var(--leetsheet-info)",
                      border: "1px solid var(--leetsheet-border-primary)" 
                    }}>
                      Company Sheet
                    </div>
                    <h2 className="text-2xl font-bold mb-3 capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                      {playlist.name}
                    </h2>
                    <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
                      {playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/Playlist/${playlist.id}`)}
                        className="btn-leetsheet-primary w-full font-semibold py-2 rounded-lg flex justify-center items-center gap-1 transition-all duration-300"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(playlist);
                          }}
                          className="w-full font-semibold py-2 rounded-lg flex justify-center items-center gap-1 transition-all duration-300 cursor-pointer"
                          style={{ 
                            backgroundColor: "var(--leetsheet-bg-tertiary)", 
                            color: "var(--leetsheet-text-primary)",
                            border: "1px solid var(--leetsheet-border-primary)" 
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: "var(--leetsheet-error)" }} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* === User Playlists === */}
          {userPlaylists.length > 0 && (
            <div className="w-full">
              <div className="text-2xl font-bold mb-8 flex items-center gap-3 px-2" style={{ 
                color: "var(--leetsheet-text-primary)", 
                fontWeight: "var(--font-weight-bold)" 
              }}>
                <Users className="w-6 h-6" style={{ color: "var(--leetsheet-orange)" }} />
                My Sheets
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: "var(--leetsheet-bg-secondary)",
                      borderLeft: "4px solid var(--leetsheet-orange)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <div className="text-lg mb-2">
                      <span className="text-blue-300 text-xl">
                        &lt;/&gt;
                      </span>
                    </div>
                    <div className="absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full" style={{ 
                      backgroundColor: "var(--leetsheet-bg-tertiary)", 
                      color: "var(--leetsheet-orange)",
                      border: "1px solid var(--leetsheet-border-primary)" 
                    }}>
                      Sheet {index + 1}
                    </div>
                    <h2 className="text-2xl font-bold mb-3 capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                      {playlist.name}
                    </h2>
                    <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
                      {playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/Playlist/${playlist.id}`)}
                        className="btn-leetsheet-primary w-full font-semibold py-2 rounded-lg flex justify-center items-center gap-1 transition-all duration-300"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(playlist);
                        }}
                        className="w-full font-semibold py-2 rounded-lg flex justify-center items-center gap-1 transition-all duration-300"
                        style={{ 
                          backgroundColor: "var(--leetsheet-bg-tertiary)", 
                          color: "var(--leetsheet-text-primary)",
                          border: "1px solid var(--leetsheet-border-primary)" 
                        }}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: "var(--leetsheet-error)" }} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Create New Sheet Card */}
                <div 
                  className="relative rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col justify-between"
                  style={{ 
                    backgroundColor: "var(--leetsheet-bg-secondary)",
                    border: "2px dashed var(--leetsheet-border-primary)",
                    minHeight: "320px"
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--leetsheet-bg-tertiary)" }}>
                        <Plus className="w-6 h-6" style={{ color: "var(--leetsheet-orange)" }} />
                      </div>
                      <h2 className="text-2xl font-bold capitalize" style={{ color: "var(--leetsheet-text-primary)" }}>
                        Create New Sheet
                      </h2>
                    </div>
                    <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--leetsheet-text-secondary)" }}>
                      Build your own curated collection of problems to master specific topics or prepare for interviews
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn-leetsheet-primary w-full font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-300"
                  >
                    <CloudLightningIcon className="w-5 h-5" />
                    Create New Sheet
                  </button>
                </div>
              </div>
            </div>
          )}

          
        </div>
      )}

      {/* Delete Modal with improved styling */}
      {isModalOpen && selectedPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ 
          backgroundColor: "rgba(0, 0, 0, 0.75)", 
          backdropFilter: "blur(6px)" 
        }}>
          <div className="rounded-xl p-8 w-full max-w-md shadow-2xl relative" style={{ 
            backgroundColor: "var(--leetsheet-bg-secondary)", 
            border: "1px solid var(--leetsheet-border-primary)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)" 
          }}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 transition-colors p-2 rounded-full"
              style={{ 
                backgroundColor: "var(--leetsheet-bg-tertiary)",
                color: "var(--leetsheet-text-muted)", 
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--leetsheet-text-primary)" }}>
              Delete Sheet
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--leetsheet-text-secondary)" }}>
              Are you sure you want to delete{" "}
              <span style={{ color: "var(--leetsheet-orange)", fontWeight: "var(--font-weight-semibold)" }}>
                "{selectedPlaylist.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-3 rounded-lg text-base transition-colors"
                style={{
                  backgroundColor: "var(--leetsheet-bg-tertiary)",
                  color: "var(--leetsheet-text-primary)",
                  border: "1px solid var(--leetsheet-border-primary)"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-3 rounded-lg text-base transition-colors"
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
