package com.arkus.challenge.data.model.dto;

import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private int code = 200;
    private String message;
    private final Map<String, Object> data = new HashMap<>();



    public static Response getInstance() {
        return new Response();
    }

    public Response addData(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

}
