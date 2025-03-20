import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice } from "../../../store/reducers/authSlice";
import * as topAPI from "../api/top";
import { dataSlice, dataStateSelector } from "../../../store/reducers/dataSlice";
import { useSelector } from "react-redux";

// Todo_Schedule全取得
export const getAllData = createAsyncThunk(
  "getData",
  async (data, { dispatch, rejectWithValue } ) => {
    dispatch(authSlice.actions.onLoading());
    try {
      const todoData = await topAPI.getAllTodo();
      const schedules = await topAPI.getAllScheduled();
      dispatch(dataSlice.actions.setTodo({ todo: todoData.data }));
      dispatch(dataSlice.actions.setSchedules({ schedules: schedules.data }));
      console.log(useSelector(dataStateSelector));
      return null;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// Todo完了
export const completeTodo = createAsyncThunk(
  "completeTodo",
  async (data, { dispatch, rejectWithValue } ) => {
    try {
      await topAPI.completeTodo(data);
      const todoData = await topAPI.getAllTodo();
      dispatch(dataSlice.actions.setTodo({ todo: todoData.data }));
      return null;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);