package jp.ac.todo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.ac.todo.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // メールアドレスからユーザを取得
    Optional<User> findByEmail(String email);
}
