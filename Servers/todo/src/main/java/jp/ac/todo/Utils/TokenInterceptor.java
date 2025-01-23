package jp.ac.todo.Utils;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!isParameterTokenEnabledForRequest(request)) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return false;
        }
        return true;
    }

    private boolean isParameterTokenEnabledForRequest(final HttpServletRequest request) {
        var contentType =
                request.getContentType() != null ? request.getContentType().split(";")[0] : null;
        return (("POST".equals(request.getMethod()) 
                    && "application/x-www-form-urlencoded".equals(contentType))
                || "GET".equals(request.getMethod()));
    }
}
