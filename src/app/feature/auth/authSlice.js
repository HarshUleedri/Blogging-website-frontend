import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAxios from "../../../api/axiosInstance";

// function for login it is doing api call to login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        formData
      );
      const data = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to login");
    }
  }
);

// function for logout it is removing token from local storage
export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

// initial state for auth slice
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isLoading: false,
  isError: null,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extra reducers for login and logout the extra reducers are used to handle the async actions given by createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.isError = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
