import React from "react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

function SuccessModal({ message, buttonName, path }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(path);
  }
  return (
    <div className="backdrop">
      <div className="modal">
        <p className="error-modal-massage">{message}</p>
        <Button onClick={onClick} label={buttonName}></Button>
      </div>
    </div>
  );
}

export default SuccessModal;
