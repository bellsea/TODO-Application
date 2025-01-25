package jp.ac.todo.Model;

import lombok.Getter;
import lombok.Setter;

/**
 * API失敗レスポンス
 */
@Getter
@Setter
public class ApiErrorResponse {

    /** HTTPステータスコード */
    private String status;

    /** エラー詳細 */
    private String detail;

    /** 参考URI */
    private String instance;
}
