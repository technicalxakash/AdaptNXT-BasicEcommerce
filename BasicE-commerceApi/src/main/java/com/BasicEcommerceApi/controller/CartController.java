package com.BasicEcommerceApi.controller;

import com.BasicEcommerceApi.Request.CartItemRequest;
import com.BasicEcommerceApi.response.CartResponseDTO;
import com.BasicEcommerceApi.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user/cart")
public class CartController {

    @Autowired private CartService cartService;

    private String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartItemRequest req) {
        cartService.addToCart(getEmail(), req.getProductId(), req.getQuantity());
        return ResponseEntity.ok("Added to cart");
    }

    @PatchMapping("/update")
    public ResponseEntity<String> updateCart(@RequestBody CartItemRequest req) {
        cartService.updateCartItem(getEmail(), req.getProductId(), req.getQuantity());
        return ResponseEntity.ok("Updated cart item");
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<String> remove(@PathVariable Long productId) {
        cartService.removeFromCart(getEmail(), productId);
        return ResponseEntity.ok("Removed from cart");
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart() {
        return ResponseEntity.ok(cartService.getCartItems(getEmail()));
    }
}