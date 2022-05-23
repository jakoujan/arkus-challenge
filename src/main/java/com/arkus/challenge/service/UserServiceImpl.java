package com.arkus.challenge.service;

import com.arkus.challenge.data.model.User;
import com.arkus.challenge.data.repository.UserRepository;
import com.arkus.challenge.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    /**
     * return user data by id
     *
     * @param id
     * @return Mono<User>
     */
    @Override
    public Mono<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    /**
     * return all users
     *
     * @return Flux<User>
     */
    @Override
    public Flux<User> findAll() {
        return this.userRepository.findAllByActive(Boolean.TRUE).map(u -> {
            u.setPassword(null);
            return u;
        });
    }

    /**
     * create a new user
     *
     * @param user
     * @return Mono<User>
     */
    @Override
    public Mono<User> create(User user) {
        System.out.println(user);
        return Mono.just(user).flatMap(u -> {
            u.setActive(Boolean.TRUE);
            u.setPassword(this.passwordEncoder.encode(u.getPassword()));
            return userRepository.save(u);
        });
    }

    /**
     * update user data
     *
     * @param id
     * @param user
     * @return Mono<User>
     */
    @Override
    public Mono<User> update(Long id, User user) {
        return Mono.just(id).flatMap(userRepository::findById).switchIfEmpty(Mono.error(new RecordNotFoundException("Usuario no encontrado")))
                .flatMap(u -> {
                    u.setName(user.getName());
                    u.setEmail(user.getEmail());
                    u.setUserRole(user.getUserRole());
                    u.setEnglishLevel(user.getEnglishLevel());
                    u.setTechKnowledge(user.getTechKnowledge());
                    u.setResumeLink(user.getResumeLink());
                    return userRepository.save(u);
                });
    }

    /**
     * delete user data
     *
     * @param id
     * @return Mono<Void>
     */
    @Override
    public Mono<Void> delete(Long id) {
        return Mono.just(id).flatMap(userRepository::findById).switchIfEmpty(Mono.error(new RecordNotFoundException("Usuario no encontrado")))
                .flatMap(u -> {
                    u.setActive(Boolean.FALSE);
                    return userRepository.save(u);
                }).then();
    }

    /**
     * @return
     */
    @Override
    public Flux<User> getAvailableUsers() {
        return this.userRepository.findAvailableUsers(Boolean.TRUE);
    }

    /**
     * @param accountId 
     * @return
     */
    @Override
    public Flux<User> getAssignedUsers(Long accountId) {
       return this.userRepository.findAssignedUsers(accountId, Boolean.TRUE);
    }
}