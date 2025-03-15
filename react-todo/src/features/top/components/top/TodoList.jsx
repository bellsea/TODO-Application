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
    setCheckedTodos([]); // チェックリストをリセット
  };

  return (
    <div className="todo-container">
      {/* タイトルとボタンを横並びに */}
      <div className="todo-header">
        <h3 className="todo-title">{selectedDate.toDateString()} の To-Do</h3>
        <button className="todo-black-button" onClick={handleCompleteTasks}>
          タスクの完了
        </button>
        <button className="todo-red-button" onClick={() => navigate("/todo/add")}>
          TODO追加
        </button>
      </div>

      {todo.length > 0 ? (
        <ul className="todo-list">
          {todo.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={checkedTodos.includes(todo.id)}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                <span className="todo-text">{todo.title}</span>
                {todo.date && <span className="todo-date">{todo.date}</span>}
                {todo.time && <span className="todo-time">{todo.time} まで</span>}
              </div>
              <button className="todo-black-button" onClick={() => navigate(`/todo/edit/${todo.id}`)}>
                編集
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>ToDoがありません</p>
      )}
    </div>
  );
};

export default TodoList;
