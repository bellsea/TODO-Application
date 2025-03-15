import axiosClient from "../../../lib/axiosClient";

/**
 * Todo一覧取得
 */
export const getAllTodo = () => {
    return axiosClient.get("/todo/all");
};

/**
 * Scedule一覧取得
 */
export const getAllScheduled = () => {
    return axiosClient.get("/schedules/all");
};