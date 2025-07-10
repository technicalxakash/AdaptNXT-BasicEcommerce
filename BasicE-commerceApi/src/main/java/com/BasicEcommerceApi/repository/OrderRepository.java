package com.BasicEcommerceApi.repository;

import com.BasicEcommerceApi.model.Order;
import com.BasicEcommerceApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUser(User user);

}
