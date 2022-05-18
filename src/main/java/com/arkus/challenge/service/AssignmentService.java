package com.arkus.challenge.service;

import com.arkus.challenge.data.model.view.AssignmentView;
import reactor.core.publisher.Flux;

public interface AssignmentService {
    public Flux<AssignmentView> getAssignments();
}
