import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No user logged in, exit early
      set({ authUser: null });
      return;
    }

    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ authUser: response.data.user });
      console.log("Auth user: ", response.data);
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while signing up: ", error);
      toast.error("Error while signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    console.log(data);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while logging in user: ", error);
      toast.error("Error while logging in user");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("token"); // Remove token
      toast.success("User logged out successfully");
    } catch (error) {
      console.log("Error while logging out user: ", error);
      // Even if the request fails, we should still clear the local state
      set({ authUser: null });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.get("/auth/refreshTokens", {
        withCredentials: true,
      });
      set({ authUser: response.data.user });
      console.log("Tokens refreshed successfully");
    } catch (error) {
      console.error("Error refreshing tokens: ", error);
    }
  },
}));
