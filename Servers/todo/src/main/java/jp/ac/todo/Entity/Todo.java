package jp.ac.todo.Entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import jp.ac.todo.Entity.Base.BaseNormalEntity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "todo")
public class Todo extends BaseNormalEntity implements Serializable{

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "deadline_date", nullable = true)
    private LocalDate deadline_date;

    @Column(name = "deadline_time", nullable = true)
    private LocalTime deadline_time;

    /** 生年月日 */
    @Column(name = "explanation", nullable = true)
    private String explanation;

    @Column(name = "routine_flg", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean routineFlg;

    @Column(name = "delete_flg", nullable = false)
    private Boolean deleteFlg;

    @Column(name = "color", nullable = true)
    private String color;

    @Column(name = "complete_flg", nullable = false)
    private String completeFlg;
}