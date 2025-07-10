package com.BasicEcommerceApi.service;

import com.BasicEcommerceApi.model.Order;

import java.util.List;

public interface OrderService {
    String placeOrder(String email);
    List<Order> getOrdersByUser(String email);
}
