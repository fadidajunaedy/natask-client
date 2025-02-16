import api from "./api"

export const getEmployee = async (_id, signal) => {
    try {
        const response = await api.get(`${import.meta.env.VITE_API_URL}/api/employees/${_id}`, { signal })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get All Employee")
    }
}

export const getAllEmployee = async (signal) => {
    try {
        const response = await api.get(`${import.meta.env.VITE_API_URL}/api/employees`, { signal })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get All Employee")
    }
}

export const createEmployee = async (request) => {
    try {
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/employees`, request, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Employee")
    }
}

export const updateEmployee = async (_id, request) => {
    try {
        const response = await api.patch(`${import.meta.env.VITE_API_URL}/api/employees/${_id}`, request, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Employee")
    }
}

export const deleteEmployee = async (_id) => {
    try {
        const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/employees/${_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create Employee")
    }
}