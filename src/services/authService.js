import axios from "axios";
import api from "./api";

export const registerUser = async (request) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    request
  );
};

export const loginUser = async (request) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    request
  );
};

export const forgotPasswordUser = async (request) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
    request
  );
};

export const resetPasswordUser = async (token, request) => {
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
    request
  );
};

export const getUser = async () => {
  return await api.get(`api/users/`);
};

export const updateUser = async (request) => {
  return await api.patch(`api/users`, request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePasswordUser = async (request) => {
  return await api.post(`api/users/change-password`, request);
};
