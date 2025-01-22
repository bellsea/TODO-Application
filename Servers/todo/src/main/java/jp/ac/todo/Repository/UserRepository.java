package jp.ac.todo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.ac.todo.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);


    // メールアドレスとパスワードでユーザーを取得
    Optional<User> findByMailaddressAndPassword(String email, String password);

    /**
     * Eメールからアカウントを取得します。
     * @param email Eメール
     * @return アカウント
     */
    Optional<User> findByEmail(String email);
}
