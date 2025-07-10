package com.BasicEcommerceApi.service;

import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.User;

import java.util.List;

public interface UserService {
    List<Product> getAllProduct();
    User getProfileInfo(String email);
}
