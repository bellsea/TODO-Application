import Header from "../header/Header";
import PropTypes from "prop-types";
import ErrorBoundary from "../../utils/ErrorBoundary";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector, initialize } from "../../store/reducers/authSlice";
import {
  errorStateSelector,
  resetError,
} from "../../store/reducers/errorSlice";
import Loading from "../Loading/Loading";
import ErrorPage from "../error/ErrorInfo";

function Layout({ title, children }) {
  const dispatch = useDispatch();
  const authState = useSelector(authStateSelector);
  const errorState = useSelector(errorStateSelector);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      dispatch(initialize());
    }
  }, [authState.isLoggedIn, dispatch]);

  useEffect(() => () => dispatch(resetError()), [dispatch]);

  return (
    <ErrorBoundary>
      <div>
        <Header title={title} />
        <div
          style={{
            paddingTop: "100px" /* ヘッダーの高さ分だけ余白を確保 */,
            minHeight:
              "calc(100vh - 80px)" /* 画面全体の高さから80px（ヘッダーの高さ）を引いた最小高さ */,
            backgroundColor: "#f9f9f9",
          }}
        >
          {authState.isLoading ? (
            <Loading />
          ) : (
            <div>
              {!errorState.isError ? (
                children
              ) : (
                <ErrorPage
                  code={errorState.errorInfo.code}
                  title={errorState.errorInfo.title}
                  detail={errorState.errorInfo.detail}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default Layout;
