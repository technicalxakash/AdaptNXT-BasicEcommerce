package com.BasicEcommerceApi.service.impl;

import com.BasicEcommerceApi.model.*;
import com.BasicEcommerceApi.repository.CartItemRepository;
import com.BasicEcommerceApi.repository.CartRepository;
import com.BasicEcommerceApi.repository.OrderRepository;
import com.BasicEcommerceApi.repository.UserRepository;
import com.BasicEcommerceApi.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired private UserRepository userRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private CartItemRepository cartItemRepository;



    @Override
    @Transactional
    public String placeOrder(String email) {
        User user = userRepository.findByEmail(email);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cart.getCartItems();
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = cartItems.stream().map(ci -> {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(ci.getProduct());
            item.setQuantity(ci.getQuantity());
            item.setPrice(ci.getProduct().getPrice());
            return item;
        }).toList();

        order.setOrderItems(orderItems);
        orderRepository.save(order);

        cartItemRepository.deleteAll(cartItems);

        return "Order placed successfully with ID: " + order.getId();
    }

    @Override
    public List<Order> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email);
        return orderRepository.findByUser(user);
    }


}
