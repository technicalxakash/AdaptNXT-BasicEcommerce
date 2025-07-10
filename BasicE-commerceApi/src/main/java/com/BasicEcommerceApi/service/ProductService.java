package com.BasicEcommerceApi.service;

import com.BasicEcommerceApi.Request.ProductRequest;
import com.BasicEcommerceApi.model.Product;

import java.util.List;

public interface ProductService {
    String addProduct(ProductRequest request);
    List<Product> getAllProduct();
    String updateProduct(Long productId,Product updatedRequest);
    String deleteProduct(Long product);
    Product getProductById(Long productId);
}
