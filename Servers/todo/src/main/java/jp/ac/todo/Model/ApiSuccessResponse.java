package jp.ac.todo.Model;

/**
 * API成功レスポンス
 */
public class ApiSuccessResponse {

    /** ステータス */
    private static final String STATUS = "success";

    /**
     * ステータスを取得します。
     * @return ステータス
     */
    public String getStatus() {
        return STATUS;
    }
}
