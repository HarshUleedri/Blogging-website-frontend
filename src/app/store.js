import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../app/feature/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
