deletePlaylist: async (playlistId) => {
  try {
    set({ isLoading: true });
    await axiosInstance.delete(`/playlist/${playlistId}`);

    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== playlistId),
    }));

    toast.success("Playlist deleted successfully");
  } catch (error) {
    console.error("Error deleting playlist: ", error);
    toast.error("Failed to delete playlist");
  } finally {
    set({ isLoading: false });
  }
}