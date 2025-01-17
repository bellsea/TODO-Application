import React from "react";
import LoginPage from "./LoginPage";
import Layout from "../../../../components/layout/Layout";

function LoginBody() {
  return (
    <div>
      <Layout title={"TodoApplication"}>
        <LoginPage />
      </Layout>
    </div>
  );
}

export default LoginBody;
