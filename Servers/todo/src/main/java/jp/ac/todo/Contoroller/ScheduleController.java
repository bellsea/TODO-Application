package jp.ac.todo.Contoroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.todo.Model.Response.ScheduleAllResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Service.ScheduleService;

@RestController
@RequestMapping("schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    /**
     * todo全取得API
     * @param userDetails ユーザー情報
     * @return userIDに紐づくTodoレスポンス一覧
     **/
    @GetMapping("/get/all")
    public List<ScheduleAllResponse> getAllSchedule(@AuthenticationPrincipal UserDetail userDetails) {
        return scheduleService.getScheduleList(userDetails.getAccount().getId());
    }
}