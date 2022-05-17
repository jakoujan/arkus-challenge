package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.dto.LoginData;
import com.arkus.challenge.data.model.dto.Response;
import com.arkus.challenge.service.SecurityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class SecurityController {

    private SecurityService securityService;

    @PostMapping("/login")
    public Mono<Response> login(@RequestBody LoginData data) {
        return this.securityService.login(data);
    }

    @GetMapping("/logout")
    public Mono<Response> logout() {
        return this.securityService.logout();
    }
}
