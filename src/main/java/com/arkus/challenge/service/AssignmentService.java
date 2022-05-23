package com.arkus.challenge.service;

import com.arkus.challenge.data.model.Assignment;
import com.arkus.challenge.data.model.dto.Response;
import com.arkus.challenge.data.model.dto.UsersToAssign;
import com.arkus.challenge.data.model.view.AssignmentView;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AssignmentService {
    public Flux<AssignmentView> getAssignments();

    public Flux<AssignmentView> getAssignments(Long userId);

    Flux<Assignment> createAssignments(UsersToAssign data);
}
