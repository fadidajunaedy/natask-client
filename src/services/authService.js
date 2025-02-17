import axios from "axios";
import api from "./api";

export const registerUser = async (request) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Register");
  }
};

export const loginUser = async (request) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Login");
  }
};

export const forgotPasswordUser = async (request) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to request Forgot Password"
    );
  }
};

export const resetPasswordUser = async (token, request) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to Reset Password"
    );
  }
};

export const getUser = async () => {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get data User");
  }
};

export const updateUser = async (request) => {
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_URL}/api/users`,
      request,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update data User"
    );
  }
};

export const changePasswordUser = async (request) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/api/change-password`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change Password"
    );
  }
};
