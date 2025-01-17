import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ErrorInfo.css"; // CSSファイルをインポート
import { authStateSelector } from "../../store/reducers/authSlice";
import { useSelector } from "react-redux";

/**
 * エラー情報
 */
function ErrorInfo({
  code,
  title = "This is the default title",
  detail = "This is the default message",
}) {
  const authState = useSelector(authStateSelector);

  return (
    <div className="container">
      <div className="grid">
        <div className="error-content">
          {code && <h2 className="error-code">{code}</h2>}
          <h4 className="error-title">{title}</h4>
          <p className="error-detail">{detail}</p>
          {authState.isLoggedIn ? (
            <Link to="/top" className="error-link">
              トップページに戻る
            </Link>
          ) : (
            <Link to="/login" className="error-link">
              ログイン画面に戻る
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

ErrorInfo.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default ErrorInfo;
