import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    key: null,
    type: null,
    _id: null,
    data: null,
    isOpen: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.key = action.payload.key
            state.type = action.payload.type
            state._id = action.payload?._id
            state.data = action.payload?.data
            state.isOpen = true
        },
        closeModal: (state, action) => {
            state.key = null
            state.type = null
            state._id = null
            state.data = null
            state.isOpen = false
        },
    }
})

export const { openModal, closeModal } = modalSlice.actions  
export default modalSlice.reducer