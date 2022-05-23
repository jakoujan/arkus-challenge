package com.arkus.challenge.data.model.dto;

import com.arkus.challenge.data.model.Account;
import com.arkus.challenge.data.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UsersToAssign {
    private List<User> users;
    private Long account;
}
