import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TodoCalendar.css";

const TodoCalendar = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate); // `TopPage`に通知
  };

  return (
    <div className="calendar-wrapper">
      <Calendar onClickDay={handleDateClick} value={date} />
    </div>
  );
};

export default TodoCalendar;