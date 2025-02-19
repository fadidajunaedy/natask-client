import api from "./api";

export const getTask = async (_id, signal) => {
  return await api.get(`api/tasks/${_id}`, { signal });
};

export const getAllTask = async (signal) => {
  return await api.get(`/api/tasks`, { signal });
};

export const createTask = async (request) => {
  return await api.post(`api/tasks`, request);
};

export const updateTask = async (_id, request) => {
  return await api.patch(`api/tasks/${_id}`, request);
};

export const deleteTask = async (_id) => {
  return await api.delete(`api/tasks/${_id}`);
};
