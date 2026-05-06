package com.nexabank.app.controller;

import com.nexabank.app.dto.customerRegRequest;
import com.nexabank.app.models.Customer;
import com.nexabank.app.repo.customerRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/")
@CrossOrigin("http://localhost:3000")
@RestController
public class customerController {

    private final customerRepo repo;
    private final PasswordEncoder passwordEncoder;
    public customerController(customerRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
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
}
