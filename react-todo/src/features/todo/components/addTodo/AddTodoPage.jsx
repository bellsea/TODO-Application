import React from "react";
import Layout from "../../../../components/layout/Layout";
import "../../asset/todoPage.css";
import AddTodoForm from "./AddTodoForm";

function AddTodoPage() {
  return (
    <Layout title={"TodoApplication"}>
      <div className="todo-page-layout">
        <h1>Todo追加</h1>
        <AddTodoForm></AddTodoForm>
      </div>
    </Layout>
  );
}

export default AddTodoPage;
