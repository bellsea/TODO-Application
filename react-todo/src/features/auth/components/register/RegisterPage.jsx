import React from "react";
import Layout from "../../../../components/layout/Layout";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  return (
    <Layout title={"TodoApplication"}>
      <div className="login-page-container">
        <h1>アカウント登録</h1>
        <RegisterForm></RegisterForm>
        <div className="link-group">
          <nav>
            <a href="login">ログイン画面へ</a>
          </nav>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
