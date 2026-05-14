package com.nexabank.app.controller;

import com.nexabank.app.config.JwtUtils;
import com.nexabank.app.dto.loginRequest;
import com.nexabank.app.dto.loginResponse;
import com.nexabank.app.models.Customer;
import com.nexabank.app.models.Admin;
import com.nexabank.app.repo.customerRepo;
import com.nexabank.app.repo.accountsRepo;
import com.nexabank.app.repo.adminRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000")
public class authController {

    private final customerRepo customerRepo;
    private final accountsRepo accountsRepo;
    private final adminRepo adminRepo;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public authController(customerRepo customerRepo, accountsRepo accountsRepo, adminRepo adminRepo, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.customerRepo = customerRepo;
        this.accountsRepo = accountsRepo;
        this.adminRepo = adminRepo;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @jakarta.annotation.PostConstruct
    public void initAdmin() {
        if (adminRepo.count() == 0) {
            Admin defaultAdmin = new Admin("ADMIN", passwordEncoder.encode("123456"), "System Admin", "admin@nexabank.com");
            adminRepo.save(defaultAdmin);
            System.out.println("Default admin account created: ADMIN / 123456");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginRequest request) {
        System.out.println("Login request received: Account=" + request.getAccountNumber() + ", PIN=" + request.getPin());
        
        String inputAccount = request.getAccountNumber() != null ? request.getAccountNumber().trim() : "";
        String inputPin = request.getPin() != null ? request.getPin().trim() : "";

        // Database Admin Check
        var adminOpt = adminRepo.findByUsername(inputAccount.toUpperCase());
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (passwordEncoder.matches(inputPin, admin.getPin())) {
                String token = jwtUtils.generateToken(admin.getUsername());
                System.out.println("Admin login successful for: " + admin.getUsername());
                return ResponseEntity.ok(new loginResponse(token, admin.getName(), admin.getEmail(), "ADMIN"));
            }
        }

        // Extract numeric ID from "ACC-1001" or similar
        String accNum = request.getAccountNumber().replaceAll("[^0-9]", "");
        if (accNum.isEmpty()) return ResponseEntity.status(401).body("Invalid account number");
        
        Long accountId = Long.parseLong(accNum);
        var accountOpt = accountsRepo.findById(accountId);

        if (accountOpt.isPresent()) {
            Customer customer = accountOpt.get().getCustomer();
            if (passwordEncoder.matches(request.getPin(), customer.getPin())) {
                // Prevent login if rejected
                if ("Rejected".equalsIgnoreCase(customer.getStatus())) {
                    return ResponseEntity.status(403).body("Access Denied: Your account has been rejected. Please contact support.");
                }
                
                String token = jwtUtils.generateToken(customer.getEmail());
                System.out.println("Generated token for " + customer.getEmail() + ": " + token);
                return ResponseEntity.ok(new loginResponse(token, customer.getName(), customer.getEmail(), "CUSTOMER"));
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
