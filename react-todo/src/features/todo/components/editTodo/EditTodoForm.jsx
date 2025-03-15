import React, { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "../../../../components/textFealds/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import "../../asset/todoForm.css";
import TextArea from "../../../../components/textFealds/TextArea";
import CheckBox from "../../../../components/checkbox/CheckBox";
import { useDispatch } from "react-redux";
import { editTodo, getTodo } from "../../state/callReducers";

function EditTodoForm({id}) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(editTodo(data));
  };

  const isFirstRender = useRef(true); // ✅ 初回判定用

  useEffect(() => {
    if (isFirstRender.current) {
      /*
      dispatch(getTodo(id));　
      無限ループの原因：authSlice.actions.fail()の時は、エラー画面を表示する実装をしなければいけない。
      authState.isFailedがtrueになったにも関わらず、もう一度このTodo編集画面を表示し、
      useEffectを動かし、authSlice.actions.onLoadingで、authState.isFailedがfalseになり、
      またauthSlice.actions.fail()が動くといった無限ループになってる気がする。
      */
      isFirstRender.current = false; // ✅ 2回目以降は実行しない
    }
  }, [dispatch, id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo-form-layout">
      {/* タイトル */}
      <div className="todo-title-label-group">
        <label className="todo-title-label">タイトル</label>
        <TextInput
          type="text"
          label="タイトル"
          {...register("title", { required: "タイトルは必須です" })}
          error={errors.title?.message}
        />
      </div>

      {/* 時間 */}
      <div className="todo-span-label-group">
        <label className="todo-span-label">期限</label>
        <label className="todo-span-detail-label">日付：</label>
        <TextInput
          type="date"
          {...register("spanDate")}
        />
        <label className="todo-span-detail-label">時間：</label>
        <TextInput
          type="time"
          {...register("spanTime")}
        />
      </div>

      {/* 説明 */}
      <div className="todo-explain-label-group">
        <label className="todo-span-label">説明</label>
        <TextArea
          label="説明"
          row={4}
          {...register("explain")}
        />
      </div>

      {/* ルーティン設定 */}
      <div className="todo-checkBox-alone">
        <CheckBox
          label="ルーティン設定"
          {...register("isRoutine")}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </div>

      {/* ルーティン設定が有効な場合 */}
      {isChecked && (
        <>
          <label className="todo-frequency">頻度</label>
          <div className="todo-checkBox-routine">
            <CheckBox
              label="月"
              {...register("monday")}
            />
            <CheckBox
              label="火"
              {...register("tuesday")}
            />
            <CheckBox
              label="水"
              {...register("wednesday")}
            />
            <CheckBox
              label="木"
              {...register("thursday")}
            />
            <CheckBox
              label="金"
              {...register("friday")}
            />
            <CheckBox
              label="土"
              {...register("saturday")}
            />
            <CheckBox
              label="日"
              {...register("sunday")}
            />
          </div>
        </>
      )}

      <Button type="submit" label="登録"/>
    </form>
  );
}

export default EditTodoForm;
