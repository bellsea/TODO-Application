package jp.ac.todo.Config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.ac.todo.Model.Security.handler.ApiAuthenticationFailureHandler;
import jp.ac.todo.Model.Security.handler.ApiAuthenticationSuccessHandler;
import jp.ac.todo.Service.UserService;

@Configuration
@EnableWebSecurity
public class WebConfig {

    @Autowired
    private UserService userService;



    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register", "resetPass", "existEmail").permitAll()
                .anyRequest().authenticated()
            )
            .cors(cors -> cors.configurationSource(getCorsConfigurationSource()))
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
    public AuthenticationFilter authenticationFilter() throws Exception {
        AuthenticationFilter filter = new AuthenticationFilter(authenticationManager(null), null);
        filter.setFilterProcessesUrl("/login"); // ログインエンドポイントを指定
        return filter;
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userService)
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

    /**
     * CORS設定
     */
    private CorsConfigurationSource getCorsConfigurationSource() {
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
