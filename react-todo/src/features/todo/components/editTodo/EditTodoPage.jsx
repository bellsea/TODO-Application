import React from "react";
import Layout from "../../../../components/layout/Layout";
import "../../asset/todoPage.css";
import AddTodoForm from "./EditTodoForm";
import { useParams } from "react-router-dom";

function EditTodoPage() {
  const { id } = useParams(); // URLのIDを取得
  return (
    <Layout title={"TodoApplication"}>
      <div className="todo-page-layout">
        <h1>Todo編集</h1>
        <AddTodoForm id={id} />
      </div>
    </Layout>
  );
}

export default EditTodoPage;
