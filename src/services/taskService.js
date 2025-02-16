import api from "./api"

export const getTask = async (_id, signal) => {
    try {
        const response = await api.get(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, { signal })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get All Task")
    }
}

export const getAllTask = async (signal) => {
    try {
        const response = await api.get(`${import.meta.env.VITE_API_URL}/api/tasks`, { signal })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get All Task")
    }
}

export const createTask = async (request) => {
    try {
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/tasks`, request)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Task")
    }
}

export const updateTask = async (_id, request) => {
    try {
        const response = await api.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, request)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Task")
    }
}

export const deleteTask = async (_id) => {
    try {
        const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Task")
    }
}