import axios from "axios";
import { store, persistor } from "../store";
import { deleteDataUser } from "../store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 Second
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
    if (
      error.response &&
      (error.response.data.message === "Token expired" ||
        error.response.data.message === "Invalid token")
    ) {
      window.location.href = "/auth/login";
      console.error("Unauthorized. Logging out...");
      store.dispatch(deleteDataUser());
      persistor.purge();
    }
    return Promise.reject(error);
  }
);

export default api;
