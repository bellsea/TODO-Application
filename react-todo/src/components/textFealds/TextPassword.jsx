import React, { useState } from "react";
import "./TextPassword.css";

function TextPassword({ label }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-group">
      {/* パスワード入力 */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder={label}
        className="password-input"
      />

      {/* パスワード表示切り替えボタン */}
      <button
        type="button"
        className="toggle-password"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
}

export default TextPassword;
