package jp.ac.todo.Service;

import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jp.ac.todo.Entity.User;
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

    public Boolean isExistEmail(String email) {
        final User user = userRepository.findByEmail(email).orElse(null);

        if(user != null) {
            return true;
        } else {
            return false;
        }
    }


}
