package com.BasicEcommerceApi.service.impl;

import com.BasicEcommerceApi.Request.UserRequest;
import com.BasicEcommerceApi.model.User;
import com.BasicEcommerceApi.repository.UserRepository;
import com.BasicEcommerceApi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public  class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public String createUser(UserRequest userRequest) {
        User newUser = new User();
        newUser.setFirstName(userRequest.getFirstName());
        newUser.setLastName(userRequest.getLastName());
        newUser.setEmail(userRequest.getEmail());
        newUser.setPassword(userRequest.getPassword());
        userRepository.save(newUser);
        return "user register successful";
    }
}
