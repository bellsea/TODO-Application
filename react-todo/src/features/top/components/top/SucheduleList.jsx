import React, { useMemo, useState } from "react";
import "./ScheduleList.css";
import { useNavigate } from "react-router-dom";
import { dataStateSelector } from "../../../../store/reducers/dataSlice";
import { useSelector } from "react-redux";

const HOUR_HEIGHT = 25; // 1時間あたりの高さ
const OFFSET_HEIGHT = 12.5; // アイテムの高さの誤差
const ITEM_WIDTH = 105; // アイテムの横幅

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// 日付フォーマット関数
const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// 時間をpxに変換
const getTimePosition = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * HOUR_HEIGHT + (minute / 60) * HOUR_HEIGHT;
};

// 時間が被ってる場合右にずらす
const findAvailableLeftPosition = (top, bottom, occupiedPositions) => {
  let left = 0;
  let foundOverlap;

  do {
    foundOverlap = false;
    for (const timeRange of Object.keys(occupiedPositions)) {
      const [occupiedTop, occupiedBottom] = timeRange.split("-").map(Number);
      if (top < occupiedBottom && bottom > occupiedTop && occupiedPositions[timeRange].includes(left)) {
        foundOverlap = true;
        left += ITEM_WIDTH;
        break;
      }
    }
  } while (foundOverlap);

  return left;
};

const ScheduleList = ({ selectedDate }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null); // クリックされたIDを管理

  const schedules = useSelector(dataStateSelector).schedules;

  const formattedDate = getFormattedDate(selectedDate);
  const filteredSchedules = useMemo(() => 
    schedules
      .filter((schedule) => schedule.date === formattedDate)
      .sort((a, b) => {
        if (a.timeFrom !== b.timeFrom) {
          return a.timeFrom.localeCompare(b.timeFrom); // timeFrom でソート
        }
        return a.timeTo.localeCompare(b.timeTo); // timeFrom が同じ場合 timeTo でソート
      }), 
    [formattedDate, schedules]
  );

  let occupiedPositions = {}; // { timeRange: [left values] }

  // 画面全体のクリックで選択解除
  const handleClickOutside = (event) => {
    if (!event.target.closest(".schedule-item") && !event.target.closest(".todo-item")) {
      setSelectedId(null);
    }
  };

  // 画面全体をクリックした時に動く関数
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // hour:minの形に変換
  const formatTime = (time) => time.match(/^\d{1,2}:\d{2}/)[0];

  return (
    <div className="schedule-container" >
      <div className="todo-header">
        <h2 className="schedule-title">{selectedDate.toLocaleDateString("ja-JP")} の予定</h2>
        <div className="todo-hedder-buttons">
          <button className="todo-red-button" onClick={() => navigate("/schedule/add")}>スケジュール追加</button>
        </div>
      </div>
      <div className="todo-container">
        <ul className="todo-list">
          {filteredSchedules.map((schedule) => (
            <li 
              key={schedule.id} 
              className={`todo-item ${selectedId === schedule.id ? "selected" : ""}`}
              onClick={() => setSelectedId(schedule.id)}
            >
              <div className="todo-content">
                <span className="todo-text">{schedule.title}</span>
                {schedule.allDay ?
                  <span className="todo-date">一日中</span> :
                  <span className="todo-date">{formatTime(schedule.timeFrom)} 〜 {formatTime(schedule.timeTo)}</span>
                }
              </div>
              <button className="todo-black-button" onClick={() => navigate(`/schedule/edit/${schedule.id}`)}>
                編集
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="schedule-wrapper">
        <div className="schedule-grid">
          {/* 時間軸 */}
          <div className="time-axis">
            {hours.map((hour) => (
              <div key={hour} className="time-label">
                {hour}
              </div>
            ))}
          </div>
          {/* スケジュールエリア */}
          <div className="schedule-list">
            {filteredSchedules.map((schedule) => {
              const top = getTimePosition(schedule.timeFrom) + OFFSET_HEIGHT;
              const bottom = getTimePosition(schedule.timeTo) + OFFSET_HEIGHT;
              const height = bottom - top;
              const left = findAvailableLeftPosition(top, bottom, occupiedPositions);

              // 予約済みの位置を記録
              const timeRange = `${top}-${bottom}`;
              occupiedPositions[timeRange] = occupiedPositions[timeRange] || [];
              occupiedPositions[timeRange].push(left);

              return (
                <div
                  key={schedule.id}
                  style={{ top: `${top}px`, height: `${height}px`, left: `${left}px` }}
                  className={`schedule-item ${selectedId === schedule.id ? "selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 他の要素のクリックイベントを防ぐ
                    setSelectedId(schedule.id);
                  }}
                > {schedule.title} <br /> {schedule.allDay ? "一日中" : <span >{formatTime(schedule.timeFrom)} - {formatTime(schedule.timeTo)}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
