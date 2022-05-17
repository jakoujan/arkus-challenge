package com.arkus.challenge.controller;

import com.arkus.challenge.data.model.User;
import com.arkus.challenge.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    @GetMapping
    public Flux<User> getUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<User> getUser(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public Mono<User> createUser(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public Mono<User> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteUser(@PathVariable("id") Long id) {
        return userService.delete(id);
    }
}
