package com.BasicEcommerceApi.Request;

import lombok.Data;

import java.util.List;


@Data
public class ProductRequest {
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private List<String> imageUrls;
}
