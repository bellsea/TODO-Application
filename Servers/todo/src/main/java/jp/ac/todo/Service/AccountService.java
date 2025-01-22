package jp.ac.todo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jp.ac.todo.Entity.User;
import jp.ac.todo.Model.Response.UserResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Repository.UserRepository;

@Service
public class AccountService implements UserDetailsService{
    
    @Autowired
    private UserRepository userRepository;

        /**
     * 認証データを取得します。
     * @param username 認証キー
     * @return アカウントデータ
     */
    @Override
    public UserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || username.isBlank()) {
            throw new UsernameNotFoundException("Username is not found.");
        }

        final User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Account dose not exist."));

        return new UserDetail(user, null);
    }

    /**
     * アカウントIDからアカウント情報レスポンスを作成します。
     * @param accountId アカウントID
     * @return アカウント情報レスポンス
     */
    public UserResponse createAccountResponse(Long userId) {
        final User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        final UserResponse accountResponse = new UserResponse();
        accountResponse.setName(user.getName());
        accountResponse.setNamekana(user.getNamekana());
        accountResponse.setMailaddress(user.getEmail());

        return accountResponse;
    }



    public Boolean isUser(String email, String password) {
        Optional<User> user = userRepository.findByMailaddressAndPassword(email, password);
        if (user != null) {     
            return true;
        } else {
            return false;
        }
    }

    public String authenticate(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByMailaddressAndPassword(email, password);
        // ここで認証ロジックを追加 (例: データベースからユーザー情報を取得)
        if (user != null) {
            
            // 成功時に JWT トークンを生成して返す
            return "generated-jwt-token";
        } else {
            throw new Exception("認証失敗");
        }
    }
}
