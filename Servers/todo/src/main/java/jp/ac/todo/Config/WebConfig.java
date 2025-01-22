package jp.ac.todo.Config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.ac.todo.Model.Security.handler.ApiAuthenticationFailureHandler;
import jp.ac.todo.Model.Security.handler.ApiAuthenticationSuccessHandler;
import jp.ac.todo.Service.AccountService;

@Configuration
public class WebConfig {

    @Autowired
    private AccountService accountService;


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .cors(cors -> cors.configurationSource(corsConfigurer()))
            .formLogin(form -> form
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler(new ApiAuthenticationSuccessHandler())
                .failureHandler(new ApiAuthenticationFailureHandler())
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessHandler(getLogoutSuccessHandler())
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
            )
            .csrf(csrf -> csrf.ignoringRequestMatchers("/**"))
            .headers(headers -> headers
                .cacheControl(cache -> cache.disable())
                .httpStrictTransportSecurity(hsts -> hsts.disable())
                .frameOptions(frameOptions -> frameOptions.disable())
            );
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(accountService)
                                    .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    /**
     * パスワードエンコーダー。
     * @return パスワードエンコーダー
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * ログアウト成功ハンドラ。
     * @return ログアウト成功ハンドラ
     */
    private LogoutSuccessHandler getLogoutSuccessHandler() {
        return new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
                response.setStatus(HttpServletResponse.SC_OK);
            }
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurer() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3000");
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.setAllowCredentials(true);

        final UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        corsSource.registerCorsConfiguration("/**", corsConfiguration);

        return corsSource;
    }
}
