package com.arkus.challenge.data.repository;

import com.arkus.challenge.data.model.Account;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends ReactiveCrudRepository<Account, Long> {

}
