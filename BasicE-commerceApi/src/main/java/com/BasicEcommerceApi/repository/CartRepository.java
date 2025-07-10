package com.BasicEcommerceApi.repository;

import com.BasicEcommerceApi.model.Cart;
import com.BasicEcommerceApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Optional<Cart> findByUser(User user);
}
