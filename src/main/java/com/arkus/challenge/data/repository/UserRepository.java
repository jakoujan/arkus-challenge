/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.arkus.challenge.data.repository;

import com.arkus.challenge.data.model.User;
import io.netty.util.AsyncMapping;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {

    Mono<User> findByUsername(String username);

    Flux<User> findAllByActive(Boolean active);

    @Query("select * from tbl_user where user_id not in (select user_id from tbl_assignment where status = 1) and active = :active")
    Flux<User> findAvailableUsers(@Param("active") Boolean active);
    @Query("select * from tbl_user where user_id in (select user_id from tbl_assignment where status = 1 and account_id = :accountId) and active = :active")
    Flux<User> findAssignedUsers(@Param("accountId")Long accountId, @Param("active") Boolean active);
}
