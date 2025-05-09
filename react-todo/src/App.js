import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./components/error/NotFound";
import ResetPassPage from "./features/auth/components/reset/ResetPassPage";
import LoginPage from "./features/auth/components/login/LoginPage";
import { authStateSelector } from "./store/reducers/authSlice";
import RegisterPage from "./features/auth/components/register/RegisterPage";
import TopPage from "./features/top/components/top/TopPage";
import AddTodoPage from "./features/todo/components/addTodo/AddTodoPage";
import EditTodoPage from "./features/todo/components/editTodo/EditTodoPage";
import AuthInitializer from "./utils/AuthInitializer";
import { AuthRedirect } from "./utils/AuthRedirect";

function App() {
  const authState = useSelector(authStateSelector);

  return (
    <BrowserRouter>
      <AuthInitializer />
      <AuthRedirect />
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
          <Route path="/" element={<Navigate replace to="/top" />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/login" element={<Navigate replace to="/top" />} />
          <Route path="/todo/add" element={<AddTodoPage />} />
          <Route path="/todo/edit/:id" element={<EditTodoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
