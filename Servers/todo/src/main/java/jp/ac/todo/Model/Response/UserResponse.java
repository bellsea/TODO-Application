package jp.ac.todo.Model.Response;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

/**
 * ユーザ情報レスポンス
 */
@Getter
@Setter
public class UserResponse {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "name_kana", nullable = false)
    private String namekana;

    @Column(name = "mailaddress", nullable = false, unique = true)
    private String mailaddress;

}

