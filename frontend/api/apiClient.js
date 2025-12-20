// axios wrapper with JWT, baseURL, and interceptors
import axios from "axios";

/**
 * Using Vite proxy → backend runs on :8000
 * All API calls go through /api
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const TOKEN_KEY = "llai_token";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error?.response?.data || {
      message: "Network / Server error",
    };
    return Promise.reject(payload);
  }
);

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default api;
