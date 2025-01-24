package jp.ac.todo.Model.Request;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.Getter;
import lombok.Setter;


/**
 * アカウント登録リクエストモデル
 */
@Getter
@Setter
public class RegisterRequest {

    /** 名前 */
    private String name;

    /** 名前カナ */
    private String name_kana;

    /** 生年月日 */
    private String birthDate;

    /** メールアドレス */
    private String email;

    /** パスワード */
    private String password;

    public LocalDate getBirthDateAsLocalDate() {
        return birthDate != null ? LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
    }

}
