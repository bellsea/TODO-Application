import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataStateSelector } from "../../../../store/reducers/dataSlice.js";
import "./TodoList.css";
import { completeTodo } from "../../state/callReducers.js";

const TodoList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector(dataStateSelector).todo;
  const schedule = useSelector(dataStateSelector).schedules;
  const [checkedTodos, setCheckedTodos] = useState([]);

  // チェックボックスの変更処理
  const handleCheckboxChange = (id) => {
    setCheckedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  // タスク完了処理（チェックされた todo の complete を true にする）
  const handleCompleteTasks = () => {
    dispatch(completeTodo(checkedTodos));
    console.log(todo, schedule);
    setCheckedTodos([]);
  };

  // 指定日を基準にタスクを分類
// 指定日を基準にタスクを分類
const pastTodos = todo
  .filter((t) => t.deadline_date && new Date(t.deadline_date) <= selectedDate) // 期限あり & 指定日以前
  .sort((a, b) => new Date(a.deadline_date) - new Date(b.deadline_date));

const futureTodosWithDate = todo
  .filter((t) => t.deadline_date && new Date(t.deadline_date) > selectedDate) // 期限あり & 指定日より後
  .sort((a, b) => new Date(a.deadline_date) - new Date(b.deadline_date));

const futureTodosWithoutDate = todo
  .filter((t) => !t.deadline_date) // 期限なし
  .sort((a, b) => a.id - b.id); // id の昇順でソート

const futureTodos = [...futureTodosWithDate, ...futureTodosWithoutDate];

  // hour:minの形に変換
  const formatTime = (time) => time.match(/^\d{1,2}:\d{2}/)[0];

  return (
    <div>
      <div className="todo-header">
        <h2>タスク一覧</h2>
        <div className="todo-hedder-buttons">
          <button className="todo-black-button" onClick={handleCompleteTasks}>タスクの完了</button>
          <button className="todo-red-button" onClick={() => navigate("/todo/add")}>TODO追加</button>
        </div>
      </div>
      {/* 指定日までのタスク */}
      {pastTodos.length ? (
        <div className="todo-container">
          <h3 className="todo-title">{selectedDate.toLocaleDateString("ja-JP")} までのタスク</h3>
          <ul className="todo-list">
            {pastTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={checkedTodos.includes(todo.id)}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  <span className="todo-text">{todo.title}</span>
                  {todo.deadline_date && <span className="todo-date">{todo.deadline_date}</span>}
                  {todo.deadline_time && <span className="todo-time">{formatTime(todo.deadline_time)} まで</span>}
                </div>
                <button className="todo-black-button" onClick={() => navigate(`/todo/edit/${todo.id}`)}>
                  編集
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (<></>)}
      {/* 指定日以降のタスク */}
      {futureTodos.length ? (
        <div className="todo-container">
          <h3 className="todo-title">{selectedDate.toLocaleDateString("ja-JP")} 以降のタスク</h3>
          <ul className="todo-list">
            {futureTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={checkedTodos.includes(todo.id)}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  <span className="todo-text">{todo.title}</span>
                  {todo.deadline_date && <span className="todo-date">{todo.deadline_date}</span>}
                  {todo.deadline_time && <span className="todo-time">{formatTime(todo.deadline_time)} まで</span>}
                </div>
                <button className="todo-black-button" onClick={() => navigate(`/todo/edit/${todo.id}`)}>
                  編集
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (<></>)}
    </div>
  );
};

export default TodoList;
