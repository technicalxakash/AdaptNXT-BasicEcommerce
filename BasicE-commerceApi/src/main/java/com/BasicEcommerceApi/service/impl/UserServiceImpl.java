package com.BasicEcommerceApi.service.impl;

import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.User;
import com.BasicEcommerceApi.repository.ProductRepository;
import com.BasicEcommerceApi.repository.UserRepository;
import com.BasicEcommerceApi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public User getProfileInfo(String email) {
        return userRepository.findByEmail(email);
    }
}
