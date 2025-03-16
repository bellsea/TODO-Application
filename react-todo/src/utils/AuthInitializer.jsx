import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../features/auth/api/login"
import {authSlice} from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    dispatch(authSlice.actions.onLoading());
    try {
      const response = await getMe();
      dispatch(authSlice.actions.loggedIn({ account: response.data }));
    } catch (error) {
      dispatch(authSlice.actions.loggedOut());
    }
  }, [dispatch, navigate]);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;  // コンポーネントとしての戻り値を明示
}

export default AuthInitializer;
