import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント取得
 */
export const existMail = (email) => {
  const params = {
    email,
  };

  return axiosClient.post("/confirm", params);
};

/**
 * ログイン
 */
export const resetPass = (email, password) => {
  const params = {
    email,
    password,
  };

  return axiosClient.post("/resetPass", params);
};
