package com.arkus.challenge.data.repository;

import com.arkus.challenge.data.model.Assignment;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AssignmentRepository extends ReactiveCrudRepository<Assignment, Long> {

    Flux<Assignment> findAllByStatus(int value);

}
