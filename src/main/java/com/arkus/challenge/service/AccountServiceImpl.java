package com.arkus.challenge.service;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.data.repository.AccountRepository;
import com.arkus.challenge.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;

    /**
     * return account data by id
     *
     * @param id
     * @return Mono<Account>
     */
    @Override
    public Mono<Account> findById(Long id) {
        return this.accountRepository.findById(id);
    }

    /**
     * return all accounts
     *
     * @return Flux<Account>
     */
    @Override
    public Flux<Account> findAll() {

        return this.accountRepository.findAll();
    }

    /**
     * create a new account
     *
     * @param account
     * @return Mono<Account>
     */
    @Override
    public Mono<Account> create(Account account) {
        return Mono.just(account).flatMap(acc -> {
            acc.setActive(Boolean.TRUE);
            return this.accountRepository.save(acc);
        });
    }

    /**
     * update account data
     *
     * @param id
     * @param account
     * @return Mono<Account>
     */
    @Override
    public Mono<Account> update(Long id, Account account) {
        return Mono.just(id).flatMap(accountRepository::findById).switchIfEmpty(Mono.error(new RecordNotFoundException("Usuario no encontrado")))
                .flatMap(u -> {
                    u.setAccountName(account.getAccountName());
                    u.setCustomerName(account.getCustomerName());
                    u.setResponsible(account.getResponsible());
                    return accountRepository.save(u);
                });
    }

    /**
     * delete account data
     *
     * @param id
     * @return Mono<Void>
     */
    @Override
    public Mono<Void> delete(Long id) {
        return Mono.just(id).flatMap(accountRepository::findById).switchIfEmpty(Mono.error(new RecordNotFoundException("Usuario no encontrado")))
                .flatMap(account -> {
                    account.setActive(Boolean.FALSE);
                    return this.accountRepository.save(account);
                }).then();
    }
}
