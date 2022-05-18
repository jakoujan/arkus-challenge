package com.arkus.challenge.data.model.view;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table("view_assignment")
public class AssignmentView {
    @Id
    @Column("assignment_id")
    private Long id;
    @Column("user_id")
    private int user;
    @Column("account_id")
    private int account;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int status;
    private String name;
    private String accountName;
}
