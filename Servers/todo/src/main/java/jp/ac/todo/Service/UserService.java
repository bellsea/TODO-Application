package jp.ac.todo.Service;

import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jp.ac.todo.Entity.User;
import jp.ac.todo.Model.Request.RegisterRequest;
import jp.ac.todo.Model.Request.ResetParam;
import jp.ac.todo.Model.Response.AccountResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    
    @Autowired
    private UserRepository userRepository;

    /**
     * 認証データを取得します。
     * @param username 認証キー
     * @return アカウントデータ
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || username.isBlank()) {
            throw new UsernameNotFoundException("Username is not found.");
        }
        final User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account dose not exist."));

        return new UserDetail(user, null);
    }

    /**
     * アカウントIDからアカウント情報レスポンスを作成します。
     * @param accountId アカウントID
     * @return アカウント情報レスポンス
     */
    public AccountResponse createAccountResponse(Long accountId) {
        final User account = userRepository.findById(accountId).orElseThrow(EntityNotFoundException::new);

        final AccountResponse accountResponse = new AccountResponse();
        accountResponse.setName(account.getName());
        accountResponse.setBirthDate(account.getBirthDate().format(DateTimeFormatter.ofPattern("uuuu/MM/dd")));

        return accountResponse;
    }

     /**
      * リクエスト情報をユーザに登録します
      * @param registerRequest
      * @return ユーザ登録のステータス
      */
    public String registerWebExaminee(RegisterRequest registerRequest) {
        User user = new User();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        user.setName(registerRequest.getName());
        user.setNamekana(registerRequest.getName_kana());
        user.setBirthDate(registerRequest.getBirthDateAsLocalDate());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(user);
 
        User isUser = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);
        return isUser != null ? "Success" : "Failed";
    }

    /**
      * メールアドレスを持つアカウントがDBに存在するか
      * @param email メールアドレス
      * @return メールアドレスを持つアカウントがDBに存在するかのBool値
      */
    public Boolean isExistEmail(String email) {
        final User user = userRepository.findByEmail(email).orElse(null);

        return user != null;
    }

    /**
      * パスワードを再設定します
      * @param registerRequest
      * @return 
      */
      public Boolean resetPassword(ResetParam resetParam) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        final String email = resetParam.getEmail();
        final String password = passwordEncoder.encode(resetParam.getPassword());


        final User user = userRepository.findByEmail(email).orElse(null);
        user.setPassword(password);

        userRepository.save(user);

        final User confirmUser = userRepository.findByEmailAndPassword(email, password).orElse(null);

        return confirmUser != null;
    }


}
