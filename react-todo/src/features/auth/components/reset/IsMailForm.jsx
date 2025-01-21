import React from "react";
import TextInput from "../../../../components/textFealds/TextInput";
import Button from "../../../../components/buttons/Button";

function IsMailForm({ register, errors, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <p className="reset-page-paragraph">
          ご登録してるメールアドレスを入力してください。
        </p>
        <TextInput
          type="text"
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
        <Button type="submit" label="送信"></Button>
      </form>
    </>
  );
}

export default IsMailForm;
