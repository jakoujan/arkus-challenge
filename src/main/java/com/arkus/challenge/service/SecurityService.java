package com.arkus.challenge.service;

import com.arkus.challenge.data.model.dto.LoginData;
import com.arkus.challenge.data.model.dto.Response;
import reactor.core.publisher.Mono;

public interface SecurityService {

    Mono<Response> login(LoginData data);

    Mono<Response> logout();
}
