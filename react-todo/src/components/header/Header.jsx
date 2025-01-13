import React from "react";
import "./Header.css";
import Sidebar from "../Sidebar/Sidebar";

function Header({ title }) {
  return (
    <div className="header-container">
      <header className="header">
        <Sidebar></Sidebar>
        <div className="logo">{title}</div>
      </header>
    </div>
  );
}

export default Header;
