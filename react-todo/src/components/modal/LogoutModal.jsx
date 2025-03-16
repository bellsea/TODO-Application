import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutModal.css";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/state/callReducers";

function LogoutModal({ message, confirmButtonName, backButtonName, setIsLogoutModalOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ログアウトモーダルを閉じる
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = async () => {
    const response = await dispatch(logout());
    console.log(response)
    if(response.type === "auth/logout/fulfilled") {
      closeLogoutModal();
      navigate("/login");
    }
  }

  return (
    <div className="backdrop">
        <div className="modal">
        <p className="modal-massage">{message}</p>
        <div className="modal-actions">
            <button className="logout-confirm" onClick={handleLogout}>{confirmButtonName}</button>
            <button className="close-modal" onClick={closeLogoutModal}>{backButtonName}</button>
        </div>
        </div>
    </div>
  );
}

export default LogoutModal;
