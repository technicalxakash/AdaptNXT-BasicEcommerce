package com.BasicEcommerceApi.controller;

import com.BasicEcommerceApi.Request.ProductRequest;
import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.User;
import com.BasicEcommerceApi.service.ProductService;
import com.BasicEcommerceApi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private ProductService productService;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfileInfo() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getProfileInfo(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(userService.getAllProduct());
    }

    @GetMapping("/home")
    public ResponseEntity<List<Product>> getProd(){
        List<Product> products = productService.getAllProduct();
        return ResponseEntity.ok(products);
    }


    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }


}