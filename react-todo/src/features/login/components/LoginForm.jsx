import React from "react";
import TextInput from "../../../components/textFealds/TextInput.jsx";
import Button from "../../../components/buttons/Button.jsx";
import "./LoginForm.css";
import TextPassword from "../../../components/textFealds/TextPassword.jsx";

function LoginForm() {
  return (
    <div className="login-form">
      <TextInput type="email" label="メールアドレス"></TextInput>
      <TextPassword label="パスワード"></TextPassword>
      <Button label="ログイン"></Button>
    </div>
  );
}

export default LoginForm;
