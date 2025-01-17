import { createSlice } from "@reduxjs/toolkit";

const initialState = { isError: false };

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    occurError: (state, action) => {
      state.isError = true;
      state.errorInfo = action.payload;
    },
    resetError: (state) => {
      state.isError = false;
    },
  },
});

export const { occurError, resetError } = errorSlice.actions;

export const errorStateSelector = (state) => state.error;

export default errorSlice.reducer;
