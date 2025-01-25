package jp.ac.todo.Model.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetParam {
    /** メールアドレス */
    private String email;

    /** パスワード */
    private String password;
}
