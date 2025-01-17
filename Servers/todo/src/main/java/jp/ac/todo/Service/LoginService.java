package jp.ac.todo.Service;

import org.springframework.stereotype.Service;

@Service
public class LoginService {
    public String authenticate(String email, String password) throws Exception {
        // ここで認証ロジックを追加 (例: データベースからユーザー情報を取得)
        if ("example@example.com".equals(email) && "password123".equals(password)) {
            // 成功時に JWT トークンを生成して返す
            return "generated-jwt-token";
        } else {
            throw new Exception("認証失敗");
        }
    }
}
