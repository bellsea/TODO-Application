package jp.ac.todo.Model.Response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * todo全取得APIレスポンスオブジェクト
 */
@Getter
@Setter
@Data
@AllArgsConstructor
public class TodoAllResponse {

	/* todoID**/
    private String id;

    /* タスク名**/
    private String title;

    /* タスク期限年月日 **/
    private LocalDate deadline_date;

    /* タスク期限時間 **/
    private LocalTime deadline_time;

    /* タスクの色 **/
    private String color;
}