package com.BasicEcommerceApi.controller;

import com.BasicEcommerceApi.Request.ProductRequest;
import com.BasicEcommerceApi.model.Product;
import com.BasicEcommerceApi.model.ProductImage;
import com.BasicEcommerceApi.repository.ProductImageRepository;
import com.BasicEcommerceApi.repository.ProductRepository;
import com.BasicEcommerceApi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody ProductRequest productRequest){
        String result = productService.addProduct(productRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/addbulk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addBulkProducts(@RequestBody List<Product> products) {
        List<ProductImage> allImages = new ArrayList<>();
        for (Product product : products) {
            for (ProductImage image : product.getImages()) {
                image.setProduct(product);
                allImages.add(image);
            }
        }
        productRepository.saveAll(products);
        productImageRepository.saveAll(allImages); // Optional
        return ResponseEntity.ok("Bulk products and images added");
    }

    @GetMapping("/get")
    public ResponseEntity<List<Product>> getProd(){
        List<Product> products = productService.getAllProduct();
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delProduct(@PathVariable("id") Long productId) {
        String result = productService.deleteProduct(productId);
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Long productId, @RequestBody Product updatedProduct) {
        String result = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(result);
    }

}
