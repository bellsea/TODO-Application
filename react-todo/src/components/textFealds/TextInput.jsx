import React from "react";
import "./TextInput.css";

function TextInput({ type, label, error, ...register }) {
  return (
    <div className="text-form-input">
      <input
        type={type}
        placeholder={label}
        {...register}
        className="text-input"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TextInput;
