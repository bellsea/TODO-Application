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

const SelectedColorItem = ({ color, schedule, isSelected, onClick, children}) => {
    const backGroundColor = colorMap[color] || "#333333";

    return (
        <li 
            key={schedule.id} 
            className="todo-item"
            onClick={onClick}
            style={{
                backgroundColor: isSelected ? backGroundColor : "#f9f9f9" , // 選択時に背景色を変更
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
            }}
        >{children}</li>
    );
};

export default SelectedColorItem;
