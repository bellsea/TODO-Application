import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../../components/textFealds/TextInput";
import TextPassword from "../../../../components/textFealds/TextPassword";
import Button from "../../../../components/buttons/Button.jsx";
import { registerAccount } from "../../state/callReducers.js";
import { authStateSelector } from "../../../../store/reducers/authSlice.js";
import SuccessModal from "../../../../components/modal/SuccessModal.jsx";
import ErrorModal from "../../../../components/modal/ErrorModal.jsx";

function RegisterForm() {
  const dispatch = useDispatch();
  const authState = useSelector(authStateSelector);
  const [showModal, setShowModal] = useState(false); // モーダル表示管理

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const isRegister = await dispatch(registerAccount(data)).unwrap();
    console.log(isRegister);
    if (isRegister !== "Success") {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Button type="submit" label="アカウント登録" />
      {authState.apiSuccess && (
        <SuccessModal
          message={"アカウント登録に成功しました。ログインを行ってください。"}
          buttonName={"ログイン画面へ"}
          path="/login"
        />
      )}

      {showModal && (
        <ErrorModal
          errorMessage={"アカウント登録に失敗しました"}
          onClick={handleCloseModal}
        />
      )}
    </form>
  );
}

export default RegisterForm;
