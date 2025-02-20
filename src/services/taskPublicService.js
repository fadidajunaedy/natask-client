import axios from "axios";

export const getTaskPublic = async (_id, signal) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/api/public/tasks/${_id}`,
    { signal }
  );
};
