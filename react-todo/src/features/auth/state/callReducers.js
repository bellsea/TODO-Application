import { createAsyncThunk } from "@reduxjs/toolkit";
import * as loginAPI from "../api/login";
import { authSlice } from "../../../store/reducers/authSlice";
import * as resetPassAPI from "../api/resetPass";
import * as registerAPI from "../api/register";
import { Navigate } from "react-router-dom";

// ログイン時
export const login = createAsyncThunk(
  "auth/login",
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

// アカウント登録時
export const registerAccount = createAsyncThunk(
  "auth/register",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authSlice.actions.onLoading());
      const response = await registerAPI.register(
        data.name,
        data.name_kana,
        data.birthDate,
        data.email,
        data.password
      );
      dispatch(authSlice.actions.successAPI());
      console.log("レスポンス：" + response.data);

      if (response.data === "Success") {
        console.log("アカウント登録成功");
        // 成功した場合、ログイン画面に遷移
        dispatch(authSlice.actions.successAPI());
        return response.data;
      } else {
        // 失敗した場合、エラーメッセージを表示
        console.log("アカウント登録に失敗しました。再度お試しください。");
        dispatch(authSlice.actions.fail());
        return rejectWithValue();
      }
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// パスワードリセット_メール入力時
export const existMail = createAsyncThunk(
  "auth/isMail",
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
  "auth/resetPass",
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
