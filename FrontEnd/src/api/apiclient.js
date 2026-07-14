import axios from "axios";



// 1. Create the instance with a base URL
const apiclient = axios.create({
  baseURL:  'http://localhost:3001/',
  timeout: 3000, // 30 seconds for large file uploads
  withCredentials: true, // CRITICAL: This sends HttpOnly cookies automatically
});

// 2. Request Interceptor (Optional - for Bearer tokens if you use localStorage)
apiclient.interceptors.request.use(
  (config) => {
    // If you decide to use Bearer token (instead of cookies), uncomment this:
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // IMPORTANT: If you are using HttpOnly cookies (which we recommended),
    // you do NOT need to manually attach anything here. 
    // withCredentials: true handles it automatically.
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Global error handling)
apiclient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle 401 Unauthorized globally (e.g., redirect to login)
      if (error.response.status === 401) {
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request made but no response (network down)
      console.error('Network Error:', error.request);
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiclient;