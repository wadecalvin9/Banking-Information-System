package com.nexabank.app.repo;

import com.nexabank.app.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface adminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}
