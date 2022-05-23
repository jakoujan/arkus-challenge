package com.arkus.challenge.data.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table("tbl_assignment")
public class Assignment implements Serializable {

    @Id
    @Column("assignment_id")
    private Long id;
    @Column("user_id")
    private Long user;
    @Column("account_id")
    private Long account;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int status;
}
