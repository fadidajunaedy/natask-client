import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShow: false
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        showSidebar: (state, action) => {
            state.isShow = action.payload.isShow
        },
        closeSidebar: (state, action) => {
            state.isShow = false
        },
    }
})

export const { showSidebar, closeSidebar } = sidebarSlice.actions  
export default sidebarSlice.reducer