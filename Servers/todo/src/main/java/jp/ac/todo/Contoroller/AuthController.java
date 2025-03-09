package jp.ac.todo.Contoroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.todo.Model.Request.RegisterRequest;
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
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetail userDetails) {
        if (userDetails == null) {
            return ResponseEntity.ok("Unauthorized");
        }
        AccountResponse account = userService.createAccountResponse(userDetails.getAccount().getId());
        return ResponseEntity.ok(account);
    }


    /**
     * アカウント登録をします。
     * @param registerRequest 登録情報リクエスト
     * @return レスポンスステータス
     */
    @PostMapping("register")
    public String register(@RequestBody RegisterRequest registerRequest) {
        return userService.registerWebExaminee(registerRequest);
    }

    

    /**
     * メールアドレスが存在するかを確認
     * @param　resetParam　メールアドレス
     * @return メールアドレスがDBに登録されてるかのBool値
     */
    @PostMapping("/confirm")
    public Boolean confirmMail(@RequestBody ResetParam resetParam) {
        
        return userService.isExistEmail(resetParam.getEmail());
    }

    /**
     * パスワードを再設定します
     * @param resetParam 
     * @return パスワード登録が成功したかのBool値
     */
    @PostMapping("/resetPass")
    public Boolean resetPass(@RequestBody ResetParam resetParam) {
        return userService.resetPassword(resetParam);
    }
    
    
}
