import React from "react";
import TextPassword from "../../../../components/textFealds/TextPassword";
import Button from "../../../../components/buttons/Button";

function ResetPassForm({ register, errors, handleSubmit, watch }) {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <p className="reset-page-paragraph">
        新しいパスワードを設定してください。
      </p>
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
      <TextPassword
        label="確認用パスワード"
        {...register("confirmPassword", {
          required: "パスワード確認を入力してください",
          validate: (value) =>
            value === watch("password") || "パスワードが一致しません",
        })}
        error={errors.confirmPassword?.message}
      ></TextPassword>
      <Button type="submit" label="送信"></Button>
    </form>
  );
}

export default ResetPassForm;
