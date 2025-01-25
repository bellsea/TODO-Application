import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./components/error/NotFound";
import ResetPassPage from "./features/auth/components/reset/ResetPassPage";
import LoginPage from "./features/auth/components/login/LoginPage";
import { authStateSelector } from "./store/reducers/authSlice";
import RegisterPage from "./features/auth/components/register/RegisterPage";

function App() {
  const authState = useSelector(authStateSelector);

  return (
    // eslint-disable-next-line react/jsx-no-undef

    <BrowserRouter>
      {!authState.isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPassPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
