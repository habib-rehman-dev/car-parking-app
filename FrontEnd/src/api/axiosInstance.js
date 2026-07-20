// api/axiosInstance.js
import axios from "axios";
// import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// ─── SILENT REFRESH STATE ──────────────────────────────────────────────────
// Tracks whether a refresh is already in progress, so multiple simultaneous
// 401s don't each trigger their own separate /refresh call
let isRefreshing = false;
let refreshQueue = [];

// ─── RESPONSE INTERCEPTOR ──────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const url = originalRequest?.url || "";

    const isAuthCheck = url.includes("/auth/me");
    const isRefreshCall = url.includes("/auth/refresh");
    const isLoginCall = url.includes("/auth/login");

    // Only attempt a silent refresh once per request, and never for the
    // refresh/login endpoints themselves — otherwise a failed refresh
    // would try to refresh itself forever
    if (status === 401 && !originalRequest._retry && !isRefreshCall && !isLoginCall) {
      originalRequest._retry = true; // mark so we never retry this same request twice

      if (isRefreshing) {
        // a refresh is already in flight — queue this request until it resolves
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axiosInstance.get("/auth/refresh"); // sets a new accessToken cookie
        refreshQueue.forEach((p) => p.resolve());
        refreshQueue = [];
        isRefreshing = false;
        return axiosInstance(originalRequest); // retry the original failed request
      } catch (refreshError) {
        refreshQueue.forEach((p) => p.reject(refreshError));
        refreshQueue = [];
        isRefreshing = false;

        // refresh token itself is invalid/expired — genuinely logged out now
        if (!isAuthCheck) {
          // toast.error("Session expired. Please log in again.");
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;