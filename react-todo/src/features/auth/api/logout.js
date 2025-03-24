import axiosClient from "../../../lib/axiosClient";

/**
 * ログイン
 */
export const logout = () => {
    return axiosClient.post("/logout");
};