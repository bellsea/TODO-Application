import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント取得
 */
export const existMail = (email) => {
  const params = {
    email: email, // 必ず `email` を JSON オブジェクトにする
  };

  return axiosClient.post("/confirm", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

/**
 * ログイン
 */
export const resetPass = (password) => {
  const params = new URLSearchParams();
  params.append("password", password);

  return axiosClient.post("/resetPass", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
