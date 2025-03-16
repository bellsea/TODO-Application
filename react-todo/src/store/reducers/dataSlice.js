import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {id: 1, title: "おやつ", date: "2025/03/14", time:"20:30"},
    {id: 2, title: "宿題", date: "2025/03/12" , time:"20:30"},
  ],
  schedules: [
    { id: 3, date: "2025-03-09", timeFrom: "18:00", timeTo: "21:00", title: "ジム" },
    { id: 4, date: "2025-03-09", timeFrom: "19:00", timeTo: "20:00", title: "読書" },
    { id: 1, date: "2025-03-09", timeFrom: "11:30", timeTo: "15:30", title: "会議" },
    { id: 2, date: "2025-03-09", timeFrom: "12:00", timeTo: "21:30", title: "ランチ" }
  ],
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
