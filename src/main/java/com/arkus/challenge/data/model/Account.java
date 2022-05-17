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
@Table("tbl_account")
public class Account implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column("account_id")
    private Long id;
    private String accountName;
    private String customerName;
    private String responsible;
    @JsonIgnore
    private boolean active;
}
