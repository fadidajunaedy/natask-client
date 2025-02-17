import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
};

export const titlePageSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload.title;
    },
    deleteTitle: (state, action) => {
      state.title = null;
    },
  },
});

export const { setTitle, deleteTitle } = titlePageSlice.actions;
export default titlePageSlice.reducer;
