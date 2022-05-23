package com.arkus.challenge.service;

import com.arkus.challenge.data.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Mono<User> findById(Long id);
    Flux<User> findAll();
    Mono<User> create(User user);
    Mono<User> update(Long id, User user);
    Mono<Void> delete(Long id);
    Flux<User> getAvailableUsers();
    Flux<User> getAssignedUsers(Long accountId);
}