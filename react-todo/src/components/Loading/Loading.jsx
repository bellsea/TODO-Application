import React from "react";
import "./Loading.css"; // CSSファイルをインポート

const Loading = ({ message = "読み込み中..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
