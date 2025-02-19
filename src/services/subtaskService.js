import api from "./api";

export const getSubtask = async (_id, signal) => {
  return await api.get(`api/subtasks/${_id}`, { signal });
};

export const getAllSubtask = async (queries, signal) => {
  return await api.get(`/api/subtasks`, {
    params: queries,
    signal,
  });
};

export const createSubtask = async (request) => {
  return await api.post(`api/subtasks`, request);
};

export const updateSubtask = async (_id, request) => {
  return await api.patch(`api/subtasks/${_id}`, request);
};

export const deleteSubtask = async (_id) => {
  return await api.delete(`api/subtasks/${_id}`);
};
