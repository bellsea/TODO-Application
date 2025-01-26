import React from "react";
import TextInput from "../../../../components/textFealds/TextInput.jsx";
import Button from "../../../../components/buttons/Button.jsx";
import "./LoginForm.css";
import TextPassword from "../../../../components/textFealds/TextPassword.jsx";
import { useForm } from "react-hook-form";
import { authStateSelector } from "../../../../store/reducers/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../state/callReducers.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const authState = useSelector(authStateSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log("送信データ:", data);
    // ここで API 送信処理を追加
    try {
      await dispatch(login(data)).unwrap();
      console.log("ログイン成功");
      console.log("状態:", authState);
      navigate("/top");
    } catch (error) {
      console.log("状態:", authState);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <TextInput
        type="email"
        label="メールアドレス"
        {...register("email", {
          required: "メールアドレスは必須です",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "正しいメールアドレスを入力してください",
          },
        })}
        error={errors.email?.message}
      ></TextInput>
      <TextPassword
        label="パスワード"
        {...register("password", {
          required: "パスワードは必須です",
          minLength: {
            value: 6,
            message: "パスワードは6文字以上で入力してください",
          },
        })}
        error={errors.password?.message}
      ></TextPassword>
      <Button type="submit" label="ログイン"></Button>
    </form>
  );
}

export default LoginForm;
