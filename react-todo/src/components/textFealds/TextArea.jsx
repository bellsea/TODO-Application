import React from "react";
import "./TextArea.css";

function TextArea({ label, error, rows = 4, ...register }) {
  return (
    <div className="text-area-form">
      <textarea
        placeholder={label}
        rows={rows}
        {...register}
        className="text-area-input"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TextArea;
