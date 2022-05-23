package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.Assignment;
import com.arkus.challenge.data.model.dto.Response;
import com.arkus.challenge.data.model.dto.UsersToAssign;
import com.arkus.challenge.data.model.view.AssignmentView;
import com.arkus.challenge.service.AssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/api/assignments")
public class AssignmentController {

    private AssignmentService assignmentService;

    @GetMapping
    public Flux<AssignmentView> getAssignments() {
        return this.assignmentService.getAssignments();
    }

    @GetMapping("/{userId}")
    public Flux<AssignmentView> getAssignments(@PathVariable("userId") Long userId) {
        return this.assignmentService.getAssignments(userId);
    }

    @PostMapping("create")
    private Flux<Assignment> createAssignments(@RequestBody UsersToAssign data) {
        return this.assignmentService.createAssignments(data);
    }
}
