package com.nexabank.app.controller;

import com.nexabank.app.dto.accountsDTO;
import com.nexabank.app.dto.accountsRequest;
import com.nexabank.app.models.Accounts;
import com.nexabank.app.models.Customer;
import com.nexabank.app.repo.accountsRepo;
import com.nexabank.app.repo.customerRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/")
public class accountsController {

    private final accountsRepo repo;
    private  final customerRepo cusRepo;

    public accountsController(accountsRepo repo, customerRepo cusRepo) {
        this.repo = repo;
        this.cusRepo = cusRepo;
    }

    @GetMapping("accounts")
    public List<Accounts> getAccounts() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUser = principal.toString();
        
        // Robust Admin Check: If user is "ADMIN", return everything
        if ("ADMIN".equalsIgnoreCase(currentUser)) {
            return repo.findAll();
        }

        return repo.findByCustomerEmail(currentUser);
    }
    @GetMapping("accounts/{id}")
    public Accounts getAccount(@PathVariable Long id){
        return repo.findById(id).orElseThrow(()->new EntityNotFoundException("Account Not Found"));
    }

    @PostMapping("accounts")
    public Accounts createAccount(@RequestBody accountsRequest request){
        Accounts accounts = new Accounts();
        Customer customer = cusRepo.findById(request.getCustomer_id()).orElseThrow();
        accounts.setType(request.getType());
        accounts.setBalance(request.getBalance());
        accounts.setStatus(request.getStatus());
        accounts.setCustomer(customer);
        return  repo.save(accounts);


    }

}
