import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlice";
import authReducer from "./Slices/authSlice"
import sideBarOpenReducer from "./Slices/sidebarOpenSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    sideBarOpen: sideBarOpenReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true,
});

export default store;

