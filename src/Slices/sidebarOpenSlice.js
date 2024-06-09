import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};

const sidebarOpenSlice = createSlice({
  name: "sidebarOpen",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isSidebarOpen =!state.isSidebarOpen;
    },
  },
});

export const { setOpen } = sidebarOpenSlice.actions;

export default sidebarOpenSlice.reducer;
