package com.BasicEcommerceApi.Request;

import lombok.Data;

@Data
public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
