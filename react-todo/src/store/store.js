import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import errorReducer from "./reducers/errorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // `authSlice.reducer` をセット
    error: errorReducer,
  },
});

export default store;
