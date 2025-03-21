import React from "react";

// 色名と対応するカラーコードのマッピング
const colorMap = {
    red: "#FF4D4D",
    orange: "#FFA500",
    yellow: "#FFD700",
    green: "#4CAF50",
    blue: "#1E90FF",
    purple: "#A020F0",
    pink: "#FF69B4",
    black: "#333333",
};

// 指定した色を少し濃くする
const getDarkerColor = (color) => {
    if (color === "#333333") return "#DDDDDD"; // 白は少しグレーにする

    const darkerHex = (hex) => {
        const value = Math.max(0, parseInt(hex, 16) - 40); // 10% 減少
        return value.toString(16).padStart(2, "0");
    };

    // 色コード (#XXXXXX) から RGB を分割
    const r = darkerHex(color.substring(1, 3));
    const g = darkerHex(color.substring(3, 5));
    const b = darkerHex(color.substring(5, 7));

    return `#${r}${g}${b}`;
};


const SelectedScheduleItem = ({ key, schedule, isSelected, onClick, top, left, height, formatTime }) => {
    const backgroundColor = isSelected ? getDarkerColor(colorMap[schedule.color] || "#333333") : colorMap[schedule.color] || "#333333";

    return (
        <div
            key={key}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `${left}px`,
                backgroundColor: backgroundColor,
                
                boxShadow: isSelected ? "0px 4px 6px rgba(0, 0, 0, 0.2)" : "none"
            }}
            className={`schedule-item ${isSelected ? "selected" : ""}`}
            onClick={(e) => {
                e.stopPropagation(); // 他の要素のクリックイベントを防ぐ
                onClick();
            }}
        >
            <strong>{schedule.title}</strong> <br />
            {schedule.allDay ? "一日中" : <span>{formatTime(schedule.timeFrom)} - {formatTime(schedule.timeTo)}</span>}
        </div>
    );
};

export default SelectedScheduleItem;
