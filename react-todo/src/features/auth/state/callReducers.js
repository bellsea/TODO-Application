import { createAsyncThunk } from "@reduxjs/toolkit";
import * as loginAPI from "../api/login";
import { authSlice } from "../../../store/reducers/authSlice";
import * as resetPassAPI from "../api/resetPass";

// ログイン時
export const login = createAsyncThunk(
  "auth/api/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await loginAPI.login(data.email, data.password);
      const response = await loginAPI.getMe();
      dispatch(authSlice.actions.loggedIn({ account: response.data }));
      return null;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// パスワードリセット_メール入力時
export const existMail = createAsyncThunk(
  "auth/api/isMail",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authSlice.actions.onLoading());
      const response = await resetPassAPI.existMail(data.mailaddres);
      dispatch(authSlice.actions.offLoading());
      return response;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// パスワードリセット時
export const resetPass = createAsyncThunk(
  "auth/api/resetPass",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authSlice.actions.onLoading());
      const response = await resetPassAPI.resetPass(data.password);
      dispatch(authSlice.actions.offLoading());
      return response;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);
