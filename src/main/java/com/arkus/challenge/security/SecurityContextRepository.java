package com.arkus.challenge.security;

import java.util.Collections;

import com.arkus.challenge.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import lombok.AllArgsConstructor;

import reactor.core.publisher.Mono;

@Component
@AllArgsConstructor
public class SecurityContextRepository implements ServerSecurityContextRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityContextRepository.class);

    private JWTUtils utils;
    private UserRepository userRepository;

    @Override
    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
        return Mono.empty();
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange exchange) {
        String bearer = "Bearer ";
        String authorization = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        return Mono.justOrEmpty(authorization).filter(b -> b.startsWith(bearer))
                .map(b -> b.substring(bearer.length()))
                .filter(this.utils::isTokenNonExpired)
                .flatMap(token -> this.userRepository.findByUsername(this.utils.getUsernameFromToken(token)))
                .flatMap(user -> Mono.just(new SecurityContextImpl(
                                        new JwtAuthenticationToken(user.getUsername(), Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole())))
                                )
                        )
                );

    }

}
