import axiosClient from "../../../lib/axiosClient";

/**
 * アカウント取得
 */
export const getMe = async () => {
  try {
    const response = await axiosClient.get("/me");
    if(response.data === "Unauthorized") {
      throw new Error("Unauthorized");
    }
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw error;
  }
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
