package com.BasicEcommerceApi.service.impl;

import com.BasicEcommerceApi.Request.CartItemDTO;
import com.BasicEcommerceApi.model.Cart;
import com.BasicEcommerceApi.model.CartItem;
import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.User;
import com.BasicEcommerceApi.repository.CartItemRepository;
import com.BasicEcommerceApi.repository.CartRepository;
import com.BasicEcommerceApi.repository.ProductRepository;
import com.BasicEcommerceApi.repository.UserRepository;
import com.BasicEcommerceApi.response.CartResponseDTO;
import com.BasicEcommerceApi.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private UserRepository userRepository;

    private Cart getCartForUser(String email) {
        User user = userRepository.findByEmail(email);
        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @Override
    public void addToCart(String email, Long productId, int quantity) {
        Cart cart = getCartForUser(email);
        Product product = productRepository.findById(productId).orElseThrow();

        Optional<CartItem> existing =cart.getCartItems().stream()
                .filter(item->item.getProduct().getId().equals(productId))
                .findFirst();

        if(existing.isPresent()){
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity());
            cartItemRepository.save(item);
        }else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setQuantity(quantity);
            newItem.setProduct(product);
            cartItemRepository.save(newItem);
        }
    }

    @Override
    public void updateCartItem(String email, Long productId, int quantity) {
        Cart cart = getCartForUser(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        CartItem item = cartItemRepository.findByCartAndProduct(cart,product).orElseThrow(()-> new RuntimeException("Item not found"));
        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    @Override
    public void removeFromCart(String email, Long productId) {
        Cart cart = getCartForUser(email);
        Product product = productRepository.findById(productId).orElseThrow(()->new RuntimeException("product not found"));
        CartItem item = cartItemRepository.findByCartAndProduct(cart,product).orElseThrow(()->new RuntimeException("Item not found"));
        cartItemRepository.delete(item);
    }

    @Override
    public CartResponseDTO getCartItems(String email) {
        Cart cart = getCartForUser(email);
        List<CartItem> items = cart.getCartItems();

        List<CartItemDTO> dtoList = items.stream()
                .map(item -> new CartItemDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity()))
                .toList();

        double total = dtoList.stream()
                .mapToDouble(dto -> dto.getPrice() * dto.getQuantity())
                .sum();

        return new CartResponseDTO(dtoList, total);
    }


}
