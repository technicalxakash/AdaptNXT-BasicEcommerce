package com.BasicEcommerceApi.controller;

import com.BasicEcommerceApi.config.JWTUtil;
import com.BasicEcommerceApi.model.Order;
import com.BasicEcommerceApi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/order")
public class OrderController {

    @Autowired private OrderService orderService;
    @Autowired
    private JWTUtil jwtUtil;

    private String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder() {
        return ResponseEntity.ok(orderService.placeOrder(getEmail()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getUserOrders() {
        return ResponseEntity.ok(orderService.getOrdersByUser(getEmail()));
    }
}