package com.BasicEcommerceApi.service;

import com.BasicEcommerceApi.response.CartResponseDTO;

public interface CartService {

    void addToCart(String email, Long ProductId, int quantity);
    void updateCartItem(String email, Long productId, int quantity);
    void removeFromCart(String email, Long productId);
    CartResponseDTO getCartItems(String email);


}
