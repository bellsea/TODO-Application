import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント登録
 */
export const register = (name, name_kana, birthDate, email, password) => {
  const params = {
    name,
    name_kana,
    birthDate,
    email,
    password,
  };

  return axiosClient.post("/register", params);
};
