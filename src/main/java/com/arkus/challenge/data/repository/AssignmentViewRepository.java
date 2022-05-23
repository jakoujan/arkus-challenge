package com.arkus.challenge.data.repository;

import com.arkus.challenge.data.model.Assignment;
import com.arkus.challenge.data.model.view.AssignmentView;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AssignmentViewRepository extends ReactiveCrudRepository<AssignmentView, Long> {

    Flux<AssignmentView> findAllByStatus(int status);

    Flux<AssignmentView> findAllByUserOrderByStatusAsc(Long userId);
}
