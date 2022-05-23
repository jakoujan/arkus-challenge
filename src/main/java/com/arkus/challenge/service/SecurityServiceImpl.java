package com.arkus.challenge.service;

import com.arkus.challenge.Constants;
import com.arkus.challenge.data.model.dto.LoginData;
import com.arkus.challenge.data.model.dto.Response;
import com.arkus.challenge.data.repository.UserRepository;
import com.arkus.challenge.security.JWTUtils;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@AllArgsConstructor
public class SecurityServiceImpl implements SecurityService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityServiceImpl.class);

    private ReactiveAuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private JWTUtils jwtUtils;

    @Override
    public Mono<Response> login(LoginData data) {
        return Mono.just(new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword()))
                .flatMap(token -> this.authenticationManager.authenticate(token))
                .flatMap(auth -> this.userRepository.findByUsername(data.getUsername()).flatMap(u -> {
                    u.setPassword(null);
                    Response response = Response.getInstance()
                            .addData(Constants.TOKEN, this.jwtUtils.generateToken(auth.getName()))
                            .addData(Constants.USER, u);
                    return Mono.just(response);
                })).onErrorReturn(Response.builder().code(401).message("Error al iniciar sesión").build());
    }

    /**
     *
     */
    @Override
    public Mono<Response> logout() {
        return ReactiveSecurityContextHolder.getContext().doOnNext(sc -> sc.setAuthentication(null))
                .flatMap(sc -> Mono.just(Response.builder().code(200).message("La sesión se ha cerrado con exito").build()));
    }

}
