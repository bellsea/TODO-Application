import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../../components/textFealds/TextInput";
import TextPassword from "../../../../components/textFealds/TextPassword";
import Button from "../../../../components/buttons/Button";
import { registerAccount } from "../../state/callReducers.js";
import { authStateSelector } from "../../../../store/reducers/authSlice.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../../components/modal/SuccessModal.jsx";

function RegisterForm() {
  const dispatch = useDispatch();
  const authState = useSelector(authStateSelector);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(registerAccount(data));
    // API呼び出し結果を基に処理
    if (resultAction.meta.requestStatus === "fulfilled") {
      if (authState.apiSuccess) {
        // 成功した場合はログイン画面に遷移
        console.log("アカウント登録再度お試しください。");
        navigate("/login");
      }
    } else {
      // 失敗した場合、エラーメッセージを表示
      console.log("アカウント登録に失敗しました。再度お試しください。");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <TextInput
        type="text"
        label="名前"
        {...register("name", {
          required: "名前は必須です",
        })}
        error={errors.name?.message}
      />
      <TextInput
        type="text"
        label="名前(カタカナ)"
        {...register("name_kana", {
          required: "名前(カタカナ)は必須です",
          pattern: {
            value: /^[\u30A0-\u30FF]+$/, // 全角カタカナのみ許可
            message: "カタカナのみ入力してください",
          },
        })}
        error={errors.name_kana?.message}
      />
      <TextInput
        type="date"
        label="生年月日"
        {...register("birthDate", {
          required: "生年月日は必須です",
          validate: {
            isValidDate: (value) =>
              !isNaN(Date.parse(value)) || "正しい日付を入力してください",
          },
        })}
        error={errors.birthDate?.message}
      />
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
      />
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
      />
      <TextPassword
        label="確認用パスワード"
        {...register("confirmPassword", {
          required: "パスワード確認を入力してください",
          validate: (value) =>
            value === watch("password") || "パスワードが一致しません",
        })}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" label="ログイン" />
      {authState.apiSuccess && (
        <SuccessModal
          message={"アカウント登録に成功しました。ログインを行ってください。"}
          buttonName={"ログイン"}
          path="/login"
        />
      )}
    </form>
  );
}

export default RegisterForm;
