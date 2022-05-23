package com.arkus.challenge.service;

import com.arkus.challenge.data.enums.AssignmentStatus;
import com.arkus.challenge.data.model.Assignment;
import com.arkus.challenge.data.model.dto.Response;
import com.arkus.challenge.data.model.dto.UsersToAssign;
import com.arkus.challenge.data.model.view.AssignmentView;
import com.arkus.challenge.data.repository.AssignmentRepository;
import com.arkus.challenge.data.repository.AssignmentViewRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final Logger LOGGER = LoggerFactory.getLogger(AssignmentServiceImpl.class);

    private AssignmentViewRepository assignmentViewRepository;
    private AssignmentRepository assignmentRepository;

    /**
     * @return
     */
    @Override
    public Flux<AssignmentView> getAssignments() {
        return this.assignmentViewRepository.findAllByStatus(AssignmentStatus.ASSIGNED.getValue());
    }

    /**
     * @param userId identifier of the user
     * @return
     */
    @Override
    public Flux<AssignmentView> getAssignments(Long userId) {
        return this.assignmentViewRepository.findAllByUserOrderByStatusAsc(userId);
    }

    /**
     * @param data
     * @return
     */
    @Override
    @Transactional
    public Flux<Assignment> createAssignments(UsersToAssign data) {
        return Flux.fromIterable(data.getUsers()).map(user -> {
            Assignment assignment = new Assignment();
            assignment.setUser(user.getId());
            assignment.setAccount(data.getAccount());
            assignment.setStatus(AssignmentStatus.ASSIGNED.getValue());
            assignment.setStartDate(LocalDateTime.now());
            return assignment;
        }).flatMap(this.assignmentRepository::save);
    }
}
