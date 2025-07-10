package com.BasicEcommerceApi.service.impl;

import com.BasicEcommerceApi.Request.ProductRequest;
import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.ProductImage;
import com.BasicEcommerceApi.repository.ProductImageRepository;
import com.BasicEcommerceApi.repository.ProductRepository;
import com.BasicEcommerceApi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

//    @Override
//    public String addProduct(ProductRequest request) {
//        Product newProduct = new Product();
//        newProduct.setName(request.getName());
//        newProduct.setDescription(request.getDescription());
//        newProduct.setPrice(request.getPrice());
//        newProduct.setStockQuantity(request.getStockQuantity());
//        productRepository.save(newProduct);
//        return "product added successfully";
//    }

    @Override
    public String addProduct(ProductRequest request) {
        Product newProduct = new Product();
        newProduct.setName(request.getName());
        newProduct.setDescription(request.getDescription());
        newProduct.setPrice(request.getPrice());
        newProduct.setStockQuantity(request.getStockQuantity());

        // Save product first to generate ID
        Product savedProduct = productRepository.save(newProduct);

        // Save images
        List<ProductImage> images = request.getImageUrls().stream().map(url -> {
            ProductImage image = new ProductImage();
            image.setUrl(url);
            image.setProduct(savedProduct);
            return image;
        }).collect(Collectors.toList());

        productImageRepository.saveAll(images);
        return "Product added successfully";
    }

    @Override
    public List<Product> getAllProduct() {
        List<Product> products = new ArrayList<>();
        products = productRepository.findAll();
        return products;
    }

    @Override
    public String updateProduct(Long productId, Product updatedRequest) {
        java.util.Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(updatedRequest.getName());
            product.setDescription(updatedRequest.getDescription());
            product.setPrice(updatedRequest.getPrice());
            product.setStockQuantity(updatedRequest.getStockQuantity());

            productRepository.save(product);
            return "Product updated successfully";
        } else {
            return "Product not found";
        }
    }

    @Override
    public String deleteProduct(Long productId) {
        java.util.Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            productRepository.delete(optionalProduct.get());
            return "Product deleted successfully";
        } else {
            return "Product not found";
        }
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }



}
