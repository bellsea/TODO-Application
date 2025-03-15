import React, { useState } from "react";
import TodoCalendar from "../../../../components/calendar/TodoCalendar";
import TodoList from "./TodoList";
import Layout from "../../../../components/layout/Layout";
import "./TopPage.css";
import SucheduleList from "./SucheduleList";

function TopPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Layout title={"カレンダー"}>
      <TodoCalendar onDateSelect={setSelectedDate} />
      <div className="top-list-body">
        <div className="top-list-child todolist-container">
          <TodoList selectedDate={selectedDate} />
        </div>
        <div className="top-list-child scheduls-container">
          <SucheduleList selectedDate={selectedDate} />
        </div>
      </div>
    </Layout>
  );
}

export default TopPage;