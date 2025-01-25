import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout/Layout";
import ResetPassForm from "./ResetPassForm";
import "./ResetPassPage.css";
import { useDispatch } from "react-redux";
import { existMail, resetPass } from "../../state/callReducers";
import IsMailForm from "./IsMailForm";
import { useForm } from "react-hook-form";
import ErrorModal from "../../../../components/modal/ErrorModal";

function ResetPassPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isMail, setIsMail] = useState(false); // メールアドレスが存在するか
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ
  const [showModal, setShowModal] = useState(false); // モーダル表示管理

  const onsubmit = async (data) => {
    try {
      if (isMail === false) {
        console.log(isMail);
        const mailExists = await dispatch(existMail(data)).unwrap();

        setIsMail(mailExists);
        console.log(mailExists);
        console.log(isMail);
        if (!mailExists) {
          setErrorMessage("メールアドレスが存在しません。");
          setShowModal(true);
          return;
        }
      } else {
        dispatch(resetPass(data));
      }
    } catch (error) {
      setErrorMessage("エラーが発生しました。");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Layout title={"TodoApplication"}>
      <div className="reset-page-container">
        <h1>パスワードリセット</h1>
        {!isMail ? (
          <IsMailForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit(onsubmit)}
          ></IsMailForm>
        ) : (
          <ResetPassForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit(onsubmit)}
            watch={watch}
          />
        )}
        <div className="link-group">
          <nav>
            <a href="login">ログイン画面へ</a>
            <a href="register">アカウント登録へ</a>
          </nav>
        </div>

        {/* メールアドレスが存在しない場合のモーダル */}
        {showModal && (
          <ErrorModal errorMessage={errorMessage} onClick={handleCloseModal} />
        )}
      </div>
    </Layout>
  );
}

export default ResetPassPage;
