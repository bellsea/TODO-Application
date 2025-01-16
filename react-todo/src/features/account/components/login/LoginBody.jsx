import React from "react";
import Header from "../../../../components/header/Header";
import LoginPage from "./LoginPage";

function LoginBody() {
  return (
    <div>
      <Header title={"TodoApplication"}></Header>
      <LoginPage></LoginPage>
    </div>
  );
}

export default LoginBody;
