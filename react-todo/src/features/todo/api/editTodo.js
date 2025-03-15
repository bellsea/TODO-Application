import axiosClient from "../../../lib/axiosClient";

/**
 * TODO取得API
 */
export const getTodo = (id) => {
    return axiosClient.get("/todo/edit/{id}");
}

/**
 * TODO編集API
 */
export const editTodo = (title, spanDate, spanTime, explain, isRoutine, routine) => {
  const params = {
    title,
    spanDate,
    spanTime,
    explain,
    isRoutine,
    routine
  };

  return axiosClient.post("/todo/edit", params);
};
