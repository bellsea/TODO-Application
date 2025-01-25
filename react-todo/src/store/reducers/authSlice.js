import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isFailed: false,
  isLoggedIn: false,
  account: null,
  apiSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoading = false;
      state.isFailed = false;
      state.isLoggedIn = true;
      state.account = action.payload.account; // 取得したデータをstateに保存
    },
    fail: (state) => {
      state.isFailed = true;
      state.isLoading = false;
    },
    onLoading: (state) => {
      state.isLoading = true;
    },
    offLoading: (state) => {
      state.isLoading = false;
    },
    successAPI: (state) => {
      state.isLoading = false;
      state.apiSuccess = true;
    },
    resetStateAPI: (state) => {
      state.apiSuccess = false;
    },
  },
});

/** 初期化 */
export const initialize = createAsyncThunk("auth/initialize");

export const authStateSelector = (state) => state.auth;

export default authSlice.reducer;
