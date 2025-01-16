import React from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page-container">
      <h1>ログイン</h1>
      <LoginForm></LoginForm>
      <div className="link-group">
        <nav>
          <a href="password">パスワードを忘れた方</a>
          <a href="register">アカウント登録へ</a>
        </nav>
      </div>
    </div>
  );
}

export default LoginPage;
