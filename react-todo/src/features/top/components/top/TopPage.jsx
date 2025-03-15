import React, { useState } from "react";
import TodoCalendar from "../../../../components/calendar/TodoCalendar";
import TodoList from "../../../../components/todolist/TodoList";
import Layout from "../../../../components/layout/Layout";
import "./TopPage.css";

function TopPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Layout title={"カレンダー"}>
      <div className="calendar-container">
        <TodoCalendar onDateSelect={setSelectedDate} />
      </div>
      <div className="todolist-container">
        <TodoList selectedDate={selectedDate} />
      </div>
    </Layout>
  );
}

export default TopPage;