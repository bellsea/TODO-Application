import React from "react";
import "./Button.css";

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="login-button">
      {label}
    </button>
  );
}

export default Button;
