// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  withCredentials: true,
});

api.interceptors.request.use((config) => {

  const adminToken = localStorage.getItem('AdminToken');
  const userToken = localStorage.getItem('token');

  if (config.headers._isAdmin && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  delete config.headers._isAdmin;
  return config;
});


export default api;
