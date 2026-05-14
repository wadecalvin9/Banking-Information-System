package com.nexabank.app.controller;

import com.nexabank.app.dto.customerRegRequest;
import com.nexabank.app.models.Customer;
import com.nexabank.app.repo.customerRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.nexabank.app.config.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
@RestController
public class customerController {

    private final customerRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public customerController(customerRepo repo, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/customers")
    public List<Customer>getCustomers(){
        return repo.findAll();
    }

    @PostMapping("/customers")
    public  Customer registerCustomer(@RequestBody customerRegRequest customerRegRequest){
        Customer customer = new Customer();
        customer.setName(customerRegRequest.getName());
        customer.setEmail(customerRegRequest.getEmail());
        customer.setPhone(customerRegRequest.getPhone());
        customer.setStatus(customerRegRequest.getStatus());
        customer.setPin(passwordEncoder.encode(customerRegRequest.getPin()));

        return repo.save(customer);
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        return repo.findById(id).map(customer -> {
            customer.setName(customerDetails.getName());
            customer.setEmail(customerDetails.getEmail());
            customer.setPhone(customerDetails.getPhone());
            customer.setStatus(customerDetails.getStatus());
            // Only update pin if provided and not empty
            if (customerDetails.getPin() != null && !customerDetails.getPin().isEmpty()) {
                customer.setPin(passwordEncoder.encode(customerDetails.getPin()));
            }
            return ResponseEntity.ok(repo.save(customer));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/profile")
    public ResponseEntity<Customer> getMe(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtUtils.extractUsername(token);
            return repo.findByEmail(email)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        return ResponseEntity.status(401).build();
    }
}
