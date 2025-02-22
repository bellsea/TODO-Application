import React from "react";
import "./CheckBox.css";

function CheckBox({ label, error, checked, onChange, ...register }) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        {...register}
        className="checkbox-input"
        checked={checked}
        onChange={onChange}
      />
      <label className="checkbox-label">{label}</label>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CheckBox;
