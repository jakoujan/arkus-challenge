package com.arkus.challenge.config;

import com.arkus.challenge.security.SecurityContextRepository;
import com.arkus.challenge.service.SecurityServiceImpl;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.savedrequest.NoOpServerRequestCache;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
@AllArgsConstructor
class SecurityConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfiguration.class);

    private ReactiveUserDetailsService userDetailsService;

    @Bean
    ReactiveAuthenticationManager authenticationManager() {
        UserDetailsRepositoryReactiveAuthenticationManager manager = new UserDetailsRepositoryReactiveAuthenticationManager(this.userDetailsService);
        manager.setPasswordEncoder(passwordEncoder());
        return manager;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, SecurityContextRepository securityContextRepository) {
        return http
                .httpBasic()
                .and()
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange()
                .pathMatchers("/api/**").authenticated()
                .anyExchange().permitAll()
                .and()
                .authenticationManager(authenticationManager())
                .securityContextRepository(securityContextRepository)
                .requestCache().requestCache(NoOpServerRequestCache.getInstance())
                .and()
                .logout(logout -> {
                    logout.logoutSuccessHandler(new ServerLogoutSuccessHandler() {
                        @Override
                        public Mono<Void> onLogoutSuccess(WebFilterExchange exchange, Authentication authentication) {
                            ServerHttpResponse response = exchange.getExchange().getResponse();
                            response.setStatusCode(HttpStatus.FOUND);
                            response.getCookies().remove("JSESSIONID");
                            return exchange.getExchange().getSession()
                                    .flatMap(WebSession::invalidate);
                        }
                    });
                }).build();
    }

}
