import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginBody from "./features/account/components/login/LoginBody";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginBody />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
