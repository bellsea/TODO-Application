import React from "react";
import "./ErrorModal.css";

function ErrorModal({ errorMessage, onClick }) {
  return (
    <div className="backdrop">
      <div className="modal">
        <p className="error-modal-massage">{errorMessage}</p>
        <button className="close-btn" onClick={onClick}>
          ✖️
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
