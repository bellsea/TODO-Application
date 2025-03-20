package jp.ac.todo.Entity;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jp.ac.todo.Entity.Base.BaseNormalEntity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User extends BaseNormalEntity implements Serializable{

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "name_kana", nullable = false)
    private String namekana;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    /** 生年月日 */
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "password", nullable = false)
    private String password;

}
