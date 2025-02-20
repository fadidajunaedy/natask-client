import axios from "axios";

export const getSubtaskPublic = async (_id, signal) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/public/subtasks/${_id}`,
    { signal }
  );
};

export const getAllSubtaskPublic = async (queries, signal) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/public/subtasks`,
    {
      params: queries,
      signal,
    }
  );
};

export const updateSubtaskPublic = async (_id, request) => {
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/public/subtasks/${_id}`,
    request
  );
};
