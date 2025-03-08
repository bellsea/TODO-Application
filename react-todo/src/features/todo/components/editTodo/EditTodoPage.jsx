import React from "react";
import Layout from "../../../../components/layout/Layout";
import "../../asset/todoPage.css";
import AddTodoForm from "./EditTodoForm";

function EditTodoPage() {
  return (
    <Layout title={"TodoApplication"}>
      <div className="todo-page-layout">
        <h1>Todo編集</h1>
        <AddTodoForm></AddTodoForm>
      </div>
    </Layout>
  );
}

export default EditTodoPage;
