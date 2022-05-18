package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.view.AssignmentView;
import com.arkus.challenge.service.AssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@AllArgsConstructor
@RequestMapping("/api/assignments")
public class AssignmentController {

    private AssignmentService assignmentService;

    @GetMapping
    public Flux<AssignmentView> getAssignments() {
        return this.assignmentService.getAssignments();
    }
}
