package jp.ac.todo.Model.Response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * schedule全取得APIレスポンスオブジェクト
 */
@Getter
@Setter
@Data
@AllArgsConstructor
public class ScheduleAllResponse {
	
	/* 予定ID **/
	private String id;

	/* 予定名 **/
	private String title;

	/* 予定年月日 **/
	private LocalDate date;

	/* 予定開始時刻 **/
	private LocalTime timeFrom;

	/* 予定終了時刻 **/
	private LocalTime timeTo;

	/* 予定カラー **/
	private String color;

	/* 一日中か判定*/
	private boolean isAllDay;
}