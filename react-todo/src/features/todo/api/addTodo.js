import axiosClient from "../../../lib/axiosClient";

/**
 * TODO追加API
 */
export const addTodo = (title, spanDate, spanTime, explain, isRoutine, routine) => {
  const params = {
    title,
    spanDate,
    spanTime,
    explain,
    isRoutine,
    routine
  };

  return axiosClient.post("/addtodo", params);
};
