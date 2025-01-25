package jp.ac.todo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import jp.ac.todo.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // メールアドレスからユーザを取得
    @Transactional(readOnly = true)
    Optional<User> findByEmail(String email);

    // メールアドレスとパスワードからユーザーを取得
    Optional<User> findByEmailAndPassword(String email, String password);
}
