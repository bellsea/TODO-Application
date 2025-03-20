package jp.ac.todo.Contoroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.todo.Model.Response.TodoAllResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Service.TodoService;

@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    /**
     * todo全取得API
     * @param userDetails ユーザー情報
     * @return userIDに紐づくTodoレスポンス一覧
     **/
    @GetMapping("/get/all")
    public List<TodoAllResponse> getAllTodo(@AuthenticationPrincipal UserDetail userDetails) {
        return todoService.getTodoList(userDetails.getAccount().getId());
    }
}