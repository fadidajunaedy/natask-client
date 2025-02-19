import api from "./api";

export const getDataDashboard = async (signal) => {
  return await api.get(`api/dashboards`, { signal });
};
