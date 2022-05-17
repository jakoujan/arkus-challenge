package com.arkus.challenge.security;

import com.arkus.challenge.data.repository.UserRepository;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@AllArgsConstructor
public class AuthenticationManager implements ReactiveAuthenticationManager {

    JWTUtils jwtUtils;

    UserRepository userRepository;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {

        String token = authentication.getCredentials().toString();
        String username = jwtUtils.getUsernameFromToken(token);

        return this.userRepository.findByUsername(username)
                .flatMap(user -> {
                    if (user.getUsername().equals(username) && jwtUtils.isTokenValidated(token)) {
                        return Mono.just(authentication);
                    } else {
                        return Mono.empty();
                    }
                });
    }

}
