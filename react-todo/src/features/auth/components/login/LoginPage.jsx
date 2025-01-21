import React from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";
import Layout from "../../../../components/layout/Layout";

function LoginPage() {
  return (
    <Layout title={"TodoApplication"}>
      <div className="login-page-container">
        <h1>ログイン</h1>
        <LoginForm></LoginForm>
        <div className="link-group">
          <nav>
            <a href="reset">パスワードを忘れた方</a>
            <a href="register">アカウント登録へ</a>
          </nav>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
