import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../services/authService";

const initialState = {
  data: [],
  token: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeDataUser: (state, action) => {
      state.data = action.payload.data;
      if (action.payload.token) state.token = action.payload.token;
      state.isLogin = true;
    },
    updateDataUser: async (state, action) => {
      const response = await getUser();
      console.log(response);
      // if (response.success) {
      //   state.data = response.data;
      // }
    },
    deleteDataUser: (state, action) => {
      state.data = null;
      state.token = null;
      state.isLogin = false;
    },
  },
});

export const { storeDataUser, updateDataUser, deleteDataUser } =
  authSlice.actions;
export default authSlice.reducer;
