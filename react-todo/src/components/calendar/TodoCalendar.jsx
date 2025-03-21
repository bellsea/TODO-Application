import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TodoCalendar.css";
import { dataStateSelector } from "../../store/reducers/dataSlice";
import { useSelector } from "react-redux";

const TodoCalendar = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());
  const schedules = useSelector(dataStateSelector).schedules;

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate); // `TopPage`に通知
  };

    // 特定の日に予定があるか確認
    const getEventsForDate = (date) => {
      // ローカルの日付を "YYYY-MM-DD" フォーマットで取得
      const formattedDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 形式で取得
      return schedules.filter(event => event.date === formattedDate);
    };

  // 日付セルに予定の色とタイトルを表示
  const tileContent = ({ date }) => {
    const eventsForDay = getEventsForDate(date);
    return eventsForDay.length > 0 ? (
      <div className="tile-events">
        {eventsForDay.map((event, index) => (
          <div key={index} className="event" style={{ backgroundColor: event.color }}>
            <span className="event-title">{event.title}</span>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="calendar-wrapper">
      <Calendar onClickDay={handleDateClick} value={date} tileContent={tileContent}/>
    </div>
  );
};

export default TodoCalendar;