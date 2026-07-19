import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "??????????????",
  timeout: 10000,
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    // const message = error?.response?.data?.message;

    if (status === 401) {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    

    // else if (status === 403) {
    //       toast.error("You do not have permission to do this.");
    //     } else if (status === 500) {
    //       toast.error("Server error. Please try again later.");
    //     }
    //     toast.success(message);
    // For everything else (400, 404, etc.) let the mutation/query handle it locally
    // because those errors are usually form-specific ("email already taken", etc.)

    return Promise.reject(error);
  },
);

export default axiosInstance;
