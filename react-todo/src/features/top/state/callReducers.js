import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice } from "../../../store/reducers/authSlice";
import * as topAPI from "../api/top";
import { dataSlice } from "../../../store/reducers/dataSlice";

// Todo_Schedule取得
export const getAllData = createAsyncThunk(
  "getData",
  async ( { dispatch, rejectWithValue } ) => {
    try {
      const todoData = await topAPI.getAllTodo();
      const schedules = await topAPI.getAllScheduled();
      dispatch(dataSlice.actions.setTodo({ todo: todoData.data }));
      dispatch(dataSlice.actions.setSchedules({ schedules: schedules.data }));
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