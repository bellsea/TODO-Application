import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = ({ selectedDate }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD 形式
      axios
        .get(`http://localhost:8080/api/todos/${formattedDate}`)
        .then((response) => setTodos(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedDate]);

  return (
    <div>
      <h2>{selectedDate.toDateString()} の To-Do</h2>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
        ) : (
          <p>ToDoがありません</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;