package com.arkus.challenge.data.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class Response {

    public static Response getInstance() {
        return new Response();
    }

    public Response() {
        this.code = 200;
        this.data = new HashMap<>();
    }

    private int code;
    private String message;
    private Map<String, Object> data;

    public Response addData(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

}
