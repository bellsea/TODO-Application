import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"; // `authSlice.reducer` を default export しているので、そのまま import

export const store = configureStore({
  reducer: {
    auth: authReducer, // `authSlice.reducer` をセット
  },
});

export default store;
