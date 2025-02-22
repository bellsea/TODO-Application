import React, { useState } from "react";
import TextInput from "../../../../components/textFealds/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../../../components/buttons/Button";
import "./AddTodoForm.css";
import TextArea from "../../../../components/textFealds/TextArea";
import CheckBox from "../../../../components/checkbox/CheckBox";
import { useDispatch } from "react-redux";
import { addTodo } from "../../state/callReducers";

function AddTodoForm() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(addTodo(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form-layout">
      {/* タイトル */}
      <div className="title-label-group">
        <label className="title-label">タイトル</label>
        <TextInput
          type="text"
          label="タイトル"
          {...register("title", { required: "タイトルは必須です" })}
          error={errors.title?.message}
        />
      </div>

      {/* 時間 */}
      <div className="span-label-group">
        <label className="span-label">期限</label>
        <label className="span-detail-label">日付：</label>
        <TextInput
          type="date"
          {...register("spanDate")}
        />
        <label className="span-detail-label">時間：</label>
        <TextInput
          type="time"
          {...register("spanTime")}
        />
      </div>

      {/* 説明 */}
      <div className="explain-label-group">
        <label className="span-label">説明</label>
        <TextArea
          label="説明"
          row={4}
          {...register("explain")}
        />
      </div>

      {/* ルーティン設定 */}
      <div className="checkBox-alone">
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
          <label className="frequency">頻度</label>
          <div className="checkBox-routine">
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

      <Button type="submit" label="登録" className="button" />
    </form>
  );
}

export default AddTodoForm;
