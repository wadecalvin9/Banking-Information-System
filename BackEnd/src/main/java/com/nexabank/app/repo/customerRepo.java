package com.nexabank.app.repo;

import com.nexabank.app.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface customerRepo extends JpaRepository <Customer , Long> {
    Optional<Customer> findByEmail(String email);
}
