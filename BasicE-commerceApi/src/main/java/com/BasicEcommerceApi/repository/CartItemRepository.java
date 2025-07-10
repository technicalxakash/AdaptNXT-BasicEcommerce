package com.BasicEcommerceApi.repository;

import com.BasicEcommerceApi.model.Cart;
import com.BasicEcommerceApi.model.CartItem;
import com.BasicEcommerceApi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

}
