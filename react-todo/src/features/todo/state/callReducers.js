import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addTodoAPI from "../api/addTodo";
import * as editTodoAPI from "../api/editTodo";
import { authSlice } from "../../../store/reducers/authSlice";

// TODO追加API
export const addTodo = createAsyncThunk(
  "todo/add",
  async (data, { dispatch, rejectWithValue }) => {
    const routine = {
        monday: data.monday,
        tuesday: data.tuesday,
        wednesday: data.wednesday,
        thursday: data.thursday,
        friday: data.friday,
        saturday: data.saturday,
        sunday: data.sunday
    }
    try {
      dispatch(authSlice.actions.onLoading());
      const response = await addTodoAPI.addTodo(
        data.title,
        data.spanDate,
        data.spanTime,
        data.explain,
        data.isRoutine,
        routine
      );
      if (response.data === "Success") {
        dispatch(authSlice.actions.successAPI());
        return response.data;
      } else {
        dispatch(authSlice.actions.fail());
        return rejectWithValue();
      }
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// TODO取得API
export const getTodo = createAsyncThunk(
  "todo/get",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log(data);
      dispatch(authSlice.actions.onLoading());
      const response = await editTodoAPI.getTodo(data);
      if (response.data.status === "Success") {
        dispatch(authSlice.actions.successAPI());
        return response.data;
      } else {
        dispatch(authSlice.actions.fail());
        return rejectWithValue();
      }
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);

// TODO編集API
export const editTodo = createAsyncThunk(
  "todo/edit",
  async (data, { dispatch, rejectWithValue }) => {
    const routine = {
        monday: data.monday,
        tuesday: data.tuesday,
        wednesday: data.wednesday,
        thursday: data.thursday,
        friday: data.friday,
        saturday: data.saturday,
        sunday: data.sunday
    }
    try {
      dispatch(authSlice.actions.onLoading());
      const response = await editTodoAPI.editTodo(
        data.title,
        data.spanDate,
        data.spanTime,
        data.explain,
        data.isRoutine,
        routine
      );
      if (response.data === "Success") {
        dispatch(authSlice.actions.successAPI());
        return response.data;
      } else {
        dispatch(authSlice.actions.fail());
        return rejectWithValue();
      }
    } catch (error) {
      dispatch(authSlice.actions.fail());
      return rejectWithValue();
    }
  }
);