import React from "react";
import "./Header.css";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { authStateSelector } from "../../store/reducers/authSlice";

function Header({ title }) {
  const authState = useSelector(authStateSelector);
  return (
    <div className="header-container">
      <header className="header">
        {authState.isLoggedIn ? <Sidebar></Sidebar> : <></>}
        <div className="logo">{title}</div>
        {authState.isLoggedIn ? (
          <div className="user-name">{authState.account.name}さん</div>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}

export default Header;
