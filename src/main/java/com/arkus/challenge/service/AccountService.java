package com.arkus.challenge.service;

import com.arkus.challenge.data.model.Account;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AccountService {
    Mono<Account> findById(Long id);
    Flux<Account> findAll();
    Mono<Account> create(Account account);
    Mono<Account> update(Long id, Account account);
    Mono<Void> delete(Long id);
}
