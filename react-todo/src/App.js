import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginBody from "./features/auth/components/login/LoginBody";
import store from "./store/store";
import { Provider } from "react-redux";
import NotFound from "./components/error/NotFound";

function App() {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginBody />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
