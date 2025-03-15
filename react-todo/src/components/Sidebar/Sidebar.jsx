import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // サイドバーの開閉切り替え
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // サイドバーを閉じる
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="sidebar-container">
      {/* ハンバーガーメニュー */}
      <div
        className={`hamburger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* オーバーレイ */}
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* サイドバー */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="menu">
          <a href="/top" onClick={closeSidebar}>
            ホーム
          </a>
          <a href="/todo/add" onClick={closeSidebar}>
            TODO追加画面
          </a>
          <a href="/todo/edit" onClick={closeSidebar}>
            TODO編集画面
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
