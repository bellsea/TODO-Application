import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
  schedules: [],
  isSuccessAPI: false,
  isFailed: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.isSuccessAPI = true;
      state.todo = action.payload.todo;
    },
    setSchedules: (state, action) => {
      state.schedules = action.payload.schedules;
      state.isSuccessAPI = true;
    },
    fail: (state) => {
      state.isFailed = true;
    }
  }
});

/** 初期化 */
export const initialize = createAsyncThunk("data/initialize");

export const dataStateSelector = (state) => state.data;

export default dataSlice.reducer;
