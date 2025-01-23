import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント取得
 */
export const existMail = (mailaddres) => {
  const params = new URLSearchParams();
  params.append("mailaddres", mailaddres);

  return axiosClient.post("/existMail", params, {
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
