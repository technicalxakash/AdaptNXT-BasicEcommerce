package com.BasicEcommerceApi.repository;

import com.BasicEcommerceApi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
//   Product findById(Long id);
}
