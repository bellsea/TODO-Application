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
@Table(name = "schedule")
public class Schedule extends BaseNormalEntity implements Serializable{

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class, optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date", nullable = true)
    private LocalDate date;

    @Column(name = "start_time", nullable = true)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = true)
    private LocalTime endTime;

    /** 生年月日 */
    @Column(name = "explanation", nullable = true)
    private String explanation;

    @Column(name = "routine_flg", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean routineFlg;

    @Column(name = "delete_flg", nullable = false)
    private Boolean deleteFlg;

    @Column(name = "color", nullable = true)
    private String color;

    @Column(name = "is_all_day", nullable = false)
    private boolean isAllDay;

    public LocalTime getStartTime() {
        if (isAllDay) {
            return LocalTime.of(0, 0); // 終日なら 00:00
        }
        return (startTime != null) ? startTime.truncatedTo(java.time.temporal.ChronoUnit.MINUTES) : LocalTime.of(0, 0);
    }

    public LocalTime getEndTime() {
        if (isAllDay) {
            return LocalTime.of(23, 59); // 終日なら 23:59
        }
        return (endTime != null) ? endTime.truncatedTo(java.time.temporal.ChronoUnit.MINUTES) : LocalTime.of(23, 59);
    }
}