import { createAsyncThunk } from "@reduxjs/toolkit";
import * as loginAPI from "../api/login";
import { authSlice } from "../../../store/reducers/authSlice";
import * as topAPI from "../api/top";
import { dataSlice } from "../../../store/reducers/dataSlice";

// Todo_Schedule取得
export const login = createAsyncThunk(
  "getData",
  async ( { dispatch, rejectWithValue } ) => {
    try {
      const todoData = await topAPI.getAllTodo();
      const schedules = await loginAPI.getAllScheduled();
      dispatch(dataSlice.actions.setTodo({ todo: todoData.data }));
      dispatch(dataSlice.actions.setSchedules({ schedules: schedules.data }));
      return null;
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);