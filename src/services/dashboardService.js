import api from "./api";

export const getDataDashboard = async (signal) => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/api/dashboards`,
      { signal }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get data Dashboard"
    );
  }
};
