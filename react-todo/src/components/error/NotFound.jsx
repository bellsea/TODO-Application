import Layout from "../layout/Layout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { occurError } from "../../store/reducers/errorSlice";

function NotFound() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      occurError({
        code: 404,
        title: "Not Found",
        detail:
          "お探しのページは一時的にアクセスができない状況にあるか、移動もしくは削除された可能性があります。 また、URL、ファイル名にタイプミスがないか再度ご確認ください。",
      })
    );
  }, [dispatch]);

  return <Layout title="Not Found" />;
}

export default NotFound;
