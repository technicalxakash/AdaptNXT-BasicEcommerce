package com.BasicEcommerceApi.Request;

import lombok.Data;

@Data
public class CartItemRequest {
    private Long productId;
    private int quantity;
}
