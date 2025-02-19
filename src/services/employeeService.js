import api from "./api";

export const getEmployee = async (_id, signal) => {
  return await api.get(`api/employees/${_id}`, { signal });
};

export const getAllEmployee = async (signal) => {
  return await api.get(`api/employees`, { signal });
};

export const createEmployee = async (request) => {
  return await api.post(`api/employees`, request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEmployee = async (_id, request) => {
  return await api.patch(`/api/employees/${_id}`, request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEmployee = async (_id) => {
  return await api.delete(`api/employees/${_id}`);
};
