import { useSelector } from "react-redux";
import { authStateSelector } from "../store/reducers/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthRedirect = () => {
    const authState = useSelector(authStateSelector);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (authState.isLoggedIn && (location.pathname === "/" || location.pathname === "/login")) {
        navigate("/top", { replace: true });
      }
    }, [authState.isLoggedIn, location.pathname, navigate]);
  
    return null; // 画面には何も表示しない
};