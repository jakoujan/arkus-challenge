/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.arkus.challenge.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.io.Serializable;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(value = "tbl_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("user_id")
    private Long id;
    @Column("user_name")
    private String username;
    @Column("user_password")
    private String password;
    private String name;
    private String email;
    private String userRole;
    @JsonIgnore
    private boolean active;

    public User(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
        this.userRole = user.getUserRole();
        this.active = user.isActive();
    }
}
