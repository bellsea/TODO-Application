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
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  return axiosClient.post("/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
