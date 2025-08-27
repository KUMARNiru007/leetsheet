import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  // Initialize isLoggedOut from localStorage if available
  isLoggedOut: localStorage.getItem('isLoggedOut') === 'true',

  checkAuth: async () => {
    // Check if user explicitly logged out previously
    const persistedLogout = localStorage.getItem('isLoggedOut') === 'true';
    
    let isLoggedOut;
    set((state) => {
      isLoggedOut = persistedLogout || state.isLoggedOut;
      return { isCheckingAuth: true };
    });
    
    // If user explicitly logged out, don't try to auto-login
    if (persistedLogout) {
      set({ authUser: null, isCheckingAuth: false });
      return;
    }
    
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.user });
      set({ isLoggedOut: false });
      localStorage.removeItem('isLoggedOut'); // Clear persisted logout state
      console.log("Auth user: ", response.data);
    } catch (error) {
      console.log("Error checking auth:", error);
      if (error.response?.status === 401 && !isLoggedOut) {
        // Only try to refresh if we haven't explicitly logged out
        try {
          await axiosInstance.get("/auth/refreshTokens");
          const newResponse = await axiosInstance.get("/auth/check");
          set({ authUser: newResponse.data.user });
          set({ isLoggedOut: false });
          localStorage.removeItem('isLoggedOut'); // Clear persisted logout state
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
          set({ authUser: null });
        }
      } else {
        set({ authUser: null });
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data.user });
      set({isLoggedOut : false});
      localStorage.removeItem('isLoggedOut'); // Clear persisted logout state

      set({token : response.data.user.tokens});
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
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.user });
      set({ isLoggedOut: false });
      localStorage.removeItem('isLoggedOut'); // Clear persisted logout state
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while logging in user: ", error);
      toast.error(error.response?.data?.message || "Error while logging in user");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      set({ isLoggedOut: true });
      localStorage.setItem('isLoggedOut', 'true'); // Persist logout state
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error while logging out user: ", error);
      // Even if the request fails, we should still clear the local state
      set({ authUser: null });
      set({ isLoggedOut: true });
      localStorage.setItem('isLoggedOut', 'true'); // Persist logout state even on error
      toast.error("Error while logging out");
    }
  },

  refreshToken: async () => {
    // Don't refresh if user has explicitly logged out
    if (localStorage.getItem('isLoggedOut') === 'true') {
      return;
    }
    
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