package com.arkus.challenge.service;

import com.arkus.challenge.data.enums.AssignmentStatus;

import com.arkus.challenge.data.model.view.AssignmentView;
import com.arkus.challenge.data.repository.AssignmentViewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@AllArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private AssignmentViewRepository assignmentViewRepository;

    /**
     * @return
     */
    @Override
    public Flux<AssignmentView> getAssignments() {
        return this.assignmentViewRepository.findAllByStatus(AssignmentStatus.ASSIGNED.getValue());
    }
}
