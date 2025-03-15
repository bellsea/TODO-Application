import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import errorReducer from "./reducers/errorSlice";
import dataSlice from "./reducers/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // `authSlice.reducer` をセット
    error: errorReducer,
    data: dataSlice
  },
});

export default store;
