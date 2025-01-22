package jp.ac.todo.Model.Security.handler;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * 認証成功時のHandlerクラス
 */
public class ApiAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    /**
     * 認証成功時の処理
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpStatus.OK.value());
        clearAuthenticationAttributes(request);
    }

    /**
     * 認証処理中に一時保存されたデータを破棄します。
     */
    private void clearAuthenticationAttributes(HttpServletRequest request) {
        final HttpSession session = request.getSession(false);

        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
}
