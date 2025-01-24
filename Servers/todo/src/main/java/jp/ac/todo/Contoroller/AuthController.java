package jp.ac.todo.Contoroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.todo.Model.Request.ResetParam;
import jp.ac.todo.Model.Response.AccountResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Service.UserService;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * セッション情報からアカウント情報を取得します。
     * @param accountDetails セッション情報
     * @return アカウント情報
     */
    @GetMapping("/me")
    public AccountResponse me(@AuthenticationPrincipal UserDetail userDetails) {
        return userService.createAccountResponse(userDetails.getAccount().getId());
    }

    /**
     * メールアドレスが存在するかを確認
     */
    @PostMapping("/confirm")
    public Boolean postMethodName(@RequestBody ResetParam param) {
        
        return userService.isExistEmail(param.getEmail());
    }
    
}
