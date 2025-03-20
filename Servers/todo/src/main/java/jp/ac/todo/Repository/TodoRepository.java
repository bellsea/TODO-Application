package jp.ac.todo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.ac.todo.Entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    /** ユーザーIDに紐づくTodoを全て取得 */
    List<Todo> findByUserId(Long userId);
}
