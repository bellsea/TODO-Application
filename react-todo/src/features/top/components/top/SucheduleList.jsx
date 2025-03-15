import React, { useMemo } from "react";
import "./ScheduleList.css";
import { useNavigate } from "react-router-dom";

const HOUR_HEIGHT = 50; // 1時間あたりの高さ
const OFFSET_TOP = 25; // アイテムのオフセット
const OFFSET_BOTTOM = 15; // 高さの誤差
const ITEM_WIDTH = 112; // 横幅

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
      if (
        top < occupiedBottom &&
        bottom > occupiedTop &&
        occupiedPositions[timeRange].includes(left)
      ) {
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

  // ✅ スケジュールデータに `id` を追加
  const schedules = useMemo(() => [
    { id: 1, date: "2025-03-09", timeFrom: "11:30", timeTo: "15:30", title: "会議" },
    { id: 2, date: "2025-03-09", timeFrom: "12:00", timeTo: "21:30", title: "ランチ" },
    { id: 3, date: "2025-03-09", timeFrom: "18:00", timeTo: "21:00", title: "ジム" },
    { id: 4, date: "2025-03-09", timeFrom: "19:00", timeTo: "20:00", title: "読書" }
  ], []);

  const formattedDate = getFormattedDate(selectedDate);
  const filteredSchedules = useMemo(
    () => schedules.filter((schedule) => schedule.date === formattedDate),
    [formattedDate, schedules]
  );

  let occupiedPositions = {}; // { timeRange: [left values] }

  return (
    <div className="schedule-container">
      <div className="todo-header">
        <h2 className="schedule-title">{selectedDate.toLocaleDateString("ja-JP")} の予定</h2>
        <div className="todo-hedder-buttons">
          <button className="todo-red-button" onClick={() => navigate("/schedule/add")}>スケジュール追加</button>
        </div>
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
              const top = getTimePosition(schedule.timeFrom) + OFFSET_TOP;
              const bottom = getTimePosition(schedule.timeTo) + OFFSET_BOTTOM;
              const height = bottom - top;
              const left = findAvailableLeftPosition(top, bottom, occupiedPositions);

              // 予約済みの位置を記録
              const timeRange = `${top}-${bottom}`;
              occupiedPositions[timeRange] = occupiedPositions[timeRange] || [];
              occupiedPositions[timeRange].push(left);

              return (
                <div
                  key={schedule.id}
                  className="schedule-item"
                  style={{ top: `${top}px`, height: `${height}px`, left: `${left}px` }}
                  onClick={() => navigate(`/schedule/edit/${schedule.id}`)} // ✅ クリックイベント追加
                >
                  {schedule.title} <br />
                  {schedule.timeFrom} - {schedule.timeTo}
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
