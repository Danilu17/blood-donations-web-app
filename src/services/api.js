// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor para añadir el token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Opcional: normalizar responses y errores
api.interceptors.response.use(
  (response) => response.data ?? response,
  (error) => {
    console.error("API error:", error?.response || error);
    throw error;
  },
);

export default api;
