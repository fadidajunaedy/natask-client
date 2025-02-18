import api from "./api";

export const getSubtask = async (_id, signal) => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/api/subtasks/${_id}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get data Subtask"
    );
  }
};

export const getAllSubtask = async (queries, signal) => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/api/subtasks`,
      {
        params: queries,
        signal,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get all data Subtask"
    );
  }
};

export const createSubtask = async (request) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/api/subtasks`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create data Subtask"
    );
  }
};

export const updateSubtask = async (_id, request) => {
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_API_URL}/api/subtasks/${_id}`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update data Subtask"
    );
  }
};

export const deleteSubtask = async (_id) => {
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_API_URL}/api/subtasks/${_id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete data Subtask"
    );
  }
};
