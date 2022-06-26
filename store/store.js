import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import alertSlice from "./alert/alertSlice";

export const store = configureStore({
  reducer: {
    oauth: authSlice,
    alert: alertSlice,
  },
});
