package jp.ac.todo.Model.Response;

import lombok.Getter;
import lombok.Setter;

/**
 * アカウント情報レスポンス
 */
@Getter
@Setter
public class AccountResponse {

    /** 名前 */
    private String name;

    /** 生年月日 */
    private String birthDate;
}