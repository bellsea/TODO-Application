import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginBody from "./features/login/components/LoginBody";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginBody />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
