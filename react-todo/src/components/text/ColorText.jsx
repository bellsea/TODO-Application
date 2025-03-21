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

const ColorText = ({ color, className, children, isSelected}) => {
    // 渡された `color` が `colorMap` にある場合、それを適用（なければデフォルトの黒）
    const textColor = isSelected ? "#333333" : colorMap[color] || "#333333" ;
    

    return <span className={className} style={{ color: textColor }}>{children}</span>;
};

export default ColorText;
