package com.arkus.challenge.data.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class LoginData {
    private String username;
    private String password;
}
