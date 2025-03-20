import axiosClient from "../../../lib/axiosClient";

/**
 * Todo一覧取得
 */
export const getAllTodo = () => {
    return axiosClient.get("/todo/get/all");
};

/**
 * Scedule一覧取得
 */
export const getAllScheduled = () => {
    return axiosClient.get("/schedule/get/all");
};

/**
 * todo完了
 */
export const completeTodo = (data) => {
    return axiosClient.post("/todo/complete", data)
};