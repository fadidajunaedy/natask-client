import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    token: null,
    isLogin: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storeUser: (state, action) => {
            state.data = action.payload.data
            state.token = action.payload.token
            state.isLogin = true
        },
        deleteUser: (state, action) => {
            state.data = null
            state.token = null
            state.isLogin = false
        },
    }
})

export const { storeUser, deleteUser } = authSlice.actions
export default authSlice.reducer
