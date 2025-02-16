import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: null,
    message: null,
    isShow: false
}

export const modalSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.type = action.payload.type
            state.message = action.payload.message,
            state.isShow = true
        },
        closeToast: (state, action) => {
            state.type = null
            state.message = null,
            state.isShow = false
        },
    }
})

export const { showToast, closeToast } = modalSlice.actions  
export default modalSlice.reducer