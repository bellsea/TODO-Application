package jp.ac.todo.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.ac.todo.Entity.Schedule;
import jp.ac.todo.Model.Response.ScheduleAllResponse;
import jp.ac.todo.Repository.ScheduleRepository;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

	/**
	 * ユーザーIDに紐づくschedule一覧からscheduleレスポンスを作成する
	 */
	public List<ScheduleAllResponse> getScheduleList(Long userId) {
		final List<Schedule> scheduleList = scheduleRepository.findByUserId(userId);
        // scheduleリストをScheduleAllResponseリストに変換
        return scheduleList.stream().map(schedule -> {

            return new ScheduleAllResponse(
                    String.valueOf(schedule.getId()),
                    schedule.getTitle(),
                    schedule.getDate(),
                    schedule.getStartTime(),
                    schedule.getEndTime(),
                    schedule.getColor(),
                    schedule.isAllDay()
            );
        }).collect(Collectors.toList());
	}
}