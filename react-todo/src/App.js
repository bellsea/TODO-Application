import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./components/error/NotFound";
import ResetPassPage from "./features/auth/components/reset/ResetPassPage";
import LoginPage from "./features/auth/components/login/LoginPage";
import { authStateSelector } from "./store/reducers/authSlice";
import RegisterPage from "./features/auth/components/register/RegisterPage";
import AddTodoPage from "./features/todo/components/addTodo/AddTodoPage";
import AuthInitializer from "./utils/AuthInitializer";
import { AuthRedirect } from "./utils/AuthRedirect";

function App() {
  const authState = useSelector(authStateSelector);

  return (
    <BrowserRouter>
      <AuthInitializer />
      <AuthRedirect />
      <Routes>
        {!authState.isLoggedIn ? (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPassPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/addtodo" element={<AddTodoPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/top" />} />
            <Route path="/top" element={<LoginPage />} />
            <Route path="/addtodo" element={<AddTodoPage />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
