import axios from "axios";

// Resolve the API base URL in this order:
// 1. VITE_API_URL env var (set it in Vercel/Render to override)
// 2. Development fallback -> local backend
// 3. Production fallback -> deployed backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:8080/api/v1"
    : "https://leetsheet.onrender.com/api/v1");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});