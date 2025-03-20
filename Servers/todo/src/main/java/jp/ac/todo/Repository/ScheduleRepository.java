package jp.ac.todo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.ac.todo.Entity.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    /** ユーザーIDに紐づくscheduleを全て取得 */
     List<Schedule> findByUserId(Long userId);
}
