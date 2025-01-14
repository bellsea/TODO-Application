import React from "react";
import "./TextInput.css";

function TextInput({ type, label }) {
  return <input type={type} placeholder={label} className="text-input" />;
}

export default TextInput;
