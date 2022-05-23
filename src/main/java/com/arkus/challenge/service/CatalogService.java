package com.arkus.challenge.service;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.data.model.User;
import reactor.core.publisher.Flux;

public interface CatalogService {

    Flux<Account> getAccounts();

    Flux<User> getUsers();
}
