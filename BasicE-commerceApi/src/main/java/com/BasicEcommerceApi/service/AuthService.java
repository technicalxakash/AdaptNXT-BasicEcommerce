package com.BasicEcommerceApi.service;

import com.BasicEcommerceApi.Request.UserRequest;

public interface AuthService {
    String createUser(UserRequest userRequest);
}
