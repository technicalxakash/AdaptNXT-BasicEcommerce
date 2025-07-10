package com.BasicEcommerceApi.response;

import com.BasicEcommerceApi.Request.CartItemDTO;
import com.BasicEcommerceApi.model.CartItem;
import lombok.Data;

import java.util.List;

@Data
public class CartResponseDTO {
    private List<CartItemDTO> items;
    private double total;

    public CartResponseDTO(List<CartItemDTO> items, double total) {
        this.items = items;
        this.total = total;
    }

}