import { createAsyncThunk } from "@reduxjs/toolkit";
import * as loginAPI from "../api/login";
import { authSlice } from "../../../store/reducers/authSlice";

// ログイン時
export const login = createAsyncThunk(
  "auth/api/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await loginAPI.login(data.mailaddres, data.password);
      const response = await loginAPI.getMe();
      dispatch(authSlice.actions.loggedIn({ account: response.data }));
      return null;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);
