import axios from "axios";
import { store } from "../store";
import { deleteDataUser } from "../store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000, // 10 Second
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or CORS issue:", error);
      return Promise.reject({ message: "Network error or CORS issue" });
    }

    const errorMessage = error.response.data?.message || "Unknown error";

    if (errorMessage === "Token expired" || errorMessage === "Invalid token") {
      console.warn("Token expired, logging out...");

      store.dispatch(deleteDataUser());
      localStorage.removeItem("persist:auth");

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
