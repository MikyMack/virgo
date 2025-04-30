import axios from "axios";

const instance = axios.create({
   baseURL: 'http://localhost:5001/', 
   headers: {
      'Authorization': localStorage.getItem('token') 
          ? `Bearer ${localStorage.getItem('token')}` 
          : null,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
   },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Handle refresh token logic if applicable here
        console.error('Token expired or unauthorized. Handle refresh token if needed.');
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
