package jp.ac.todo.Contoroller;

import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    /**
     * @param mailaddress
     * @param password
     * @return
     */
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public String login(@RequestParam("mailaddres") String mailaddres,
    @RequestParam("password") String password) {
        System.out.println("リクエスト受信: mailaddress=" + mailaddres + ", password=" + password);
        return "me";
    }

    @GetMapping("/me")
    public String getMe() {
        // 仮のユーザー情報を返却
        return "現在ログイン中のユーザー情報";
    }
}
