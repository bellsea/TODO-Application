import React, { useState } from "react";
import "./TextPassword.css";

function TextPassword({ label, error, ...register }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-form-group">
      <div className="password-group">
        {/* パスワード入力 */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder={label}
          className="password-input"
          {...register}
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TextPassword;
