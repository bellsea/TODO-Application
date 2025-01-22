package jp.ac.todo.Contoroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.todo.Model.Response.UserResponse;
import jp.ac.todo.Model.Security.UserDetail;
import jp.ac.todo.Service.AccountService;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

        /**
     * セッション情報からアカウント情報を取得します。
     * @param userDetail セッション情報
     * @return アカウント情報
     */
    @GetMapping("me")
    public UserResponse me(@AuthenticationPrincipal UserDetail userDetail) {
        return accountService.createAccountResponse(userDetail.getAccount().getId());
    }

}
