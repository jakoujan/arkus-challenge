package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/api/accounts")
public class AccountController {
    private AccountService accountService;

    @GetMapping
    public Flux<Account> getAccounts() {
        return accountService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Account> getAccount(@PathVariable("id") Long id) {
        return accountService.findById(id);
    }

    @PostMapping
    public Mono<Account> createAccount(@RequestBody Account account) {
        return accountService.create(account);
    }

    @PutMapping("/{id}")
    public Mono<Account> updateAccount(@PathVariable("id") Long id, @RequestBody Account account) {
        return accountService.update(id, account);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteAccount(@PathVariable("id") Long id) {
        return accountService.delete(id);
    }
}