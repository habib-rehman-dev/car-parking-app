import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "??????????????",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
// Runs before every request leaves the browser
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Request failed before even leaving (rare — network config issues)
    return Promise.reject(error);
  },
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
// Runs on every response that comes back from the server
axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx responses — just pass through
    toast(response.status);

    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // Handle specific HTTP status codes globally
    if (status === 401) {
      // Unauthorized — clear token, redirect to login
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("You do not have permission to do this.");
    } else if (status === 500) {
      toast.error("Server error. Please try again later.");
    }
    toast.success(message);
    // For everything else (400, 404, etc.) let the mutation/query handle it locally
    // because those errors are usually form-specific ("email already taken", etc.)

    return Promise.reject(error);
  },
);

export default axiosInstance;
