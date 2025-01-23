import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント取得
 */
export const getMe = () => {
  return axiosClient.get("me");
};

/**
 * ログイン
 */
export const login = (email, password) => {
  const data = { email, password };

  return axiosClient.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
