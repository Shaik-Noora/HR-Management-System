import axios from "axios";
import { toCamel, toSnake } from "../utils/caseConverter";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ SAFE SNAKE CONVERSION (NO LONGER BREAKS LOGIN)
  if (config.method !== "get" && config.data && !config.skipSnake) {
    config.data = toSnake(config.data);
  }

  return config;
});

api.interceptors.response.use((response) => {
  response.data = toCamel(response.data);
  return response;
});

export default api;
