import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  users: [],
  activeUsers: [],
  isLoading: false,

  getAllUsers: async (includeAdmins = false) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/users?includeAdmins=${includeAdmins}`
      );
      set({ users: response.data.users });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isLoading: false });
    }
  },

  getActiveUsers: async (days = 7) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/users/active?days=${days}`);
      set({ activeUsers: response.data.users });
    } catch (error) {
      console.error("Error fetching active users:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch active users"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));


