import React, { useEffect } from "react";
import { dataStateSelector } from "../../../../store/reducers/dataSlice.js";
import { useSelector } from "react-redux";

const SucheduleList = ({ selectedDate }) => {
  const todo = useSelector(dataStateSelector).todo;

  useEffect(() => {

  }, []);

  return (
    <div>
      <h2>{selectedDate.toDateString()} の To-Do</h2>
      <ul>
        { todo.length > 0 ? (
          todo.map
            ((todo) => <li key={todo.id}>{todo.title} {todo.date} {todo.time}</li>)
        ) : (
          <p>ToDoがありません</p>
        )}
     
     
      </ul>
    </div>
  );
};

export default SucheduleList;