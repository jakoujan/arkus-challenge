package com.arkus.challenge.data.repository;

import com.arkus.challenge.data.model.Account;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AccountRepository extends ReactiveCrudRepository<Account, Long> {

    Flux<Account> findAllByActive(Boolean active);
}
