package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.data.model.User;
import com.arkus.challenge.service.CatalogService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@AllArgsConstructor
@RequestMapping("/api/catalogs")
public class CatalogController {

    private CatalogService catalogService;

    @GetMapping("/accounts")
    public Flux<Account> getAccounts() {
        return this.catalogService.getAccounts();
    }

    @GetMapping("/users")
    public Flux<User> getUsers() {
        return this.catalogService.getUsers();
    }


}
