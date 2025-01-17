import Layout from "../components/layout/Layout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { occurError } from "../store/reducers/errorSlice";

function Unexpected() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      occurError({
        title: "予期せぬエラーが発生しました",
        detail: "しばらくしても解決しない場合はサポートまでご連絡ください",
      })
    );
  }, [dispatch]);

  return <Layout />;
}

export default Unexpected;
