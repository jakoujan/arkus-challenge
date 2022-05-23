package com.arkus.challenge.service;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.data.model.User;
import com.arkus.challenge.data.repository.AccountRepository;
import com.arkus.challenge.data.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@AllArgsConstructor
public class CatalogServiceImpl implements CatalogService {

    private AccountRepository accountRepository;
    private UserRepository userRepository;

    /**
     * @return 
     */
    @Override
    public Flux<Account> getAccounts() {
        return this.accountRepository.findAllByActive(Boolean.TRUE);
    }

    /**
     * @return 
     */
    @Override
    public Flux<User> getUsers() {
        return this.userRepository.findAllByActive(Boolean.TRUE);
    }


}
