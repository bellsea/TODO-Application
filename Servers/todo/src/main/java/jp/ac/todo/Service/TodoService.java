package jp.ac.todo.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.ac.todo.Entity.Todo;
import jp.ac.todo.Model.Response.TodoAllResponse;
import jp.ac.todo.Repository.TodoRepository;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

	/**
	 * ユーザーIDに紐づくtodo一覧からtodoレスポンスを作成する
	 */
	public List<TodoAllResponse> getTodoList(Long userId) {
		final List<Todo> todoList = todoRepository.findByUserId(userId);
        // TodoリストをTodoAllResponseリストに変換
        return todoList.stream().map(todo -> new TodoAllResponse(
                String.valueOf(todo.getId()),
                todo.getTitle(),
                todo.getDeadline_date(),
                todo.getDeadline_time(),
                todo.getColor()
        )).collect(Collectors.toList());
	}
}