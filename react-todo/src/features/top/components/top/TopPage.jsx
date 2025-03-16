import React, { useEffect, useState } from "react";
import TodoCalendar from "../../../../components/calendar/TodoCalendar";
import TodoList from "./TodoList";
import Layout from "../../../../components/layout/Layout";
import "./TopPage.css";
import SucheduleList from "./SucheduleList";
import { useDispatch } from "react-redux";
import { getAllData } from "../../state/callReducers";

function TopPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);

  return (
    <Layout title={"カレンダー"}>
      <div className="fixed-calendar">
        <TodoCalendar onDateSelect={setSelectedDate} />
      </div>
      <div className="top-list-body">
        <div className="top-list-child scheduls-container">
          <SucheduleList selectedDate={selectedDate} />
        </div>
        <div className="top-list-child todolist-container">
          <TodoList selectedDate={selectedDate} />
        </div>
      </div>
    </Layout>
  );
  
}

export default TopPage;