package com.nexabank.app.controller;
import com.nexabank.app.dto.transactionRequest;
import com.nexabank.app.models.Transactions;
import com.nexabank.app.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("/api/")
@CrossOrigin("http://localhost:3000")
@RestController
public class transactionController {
    private final TransactionService service;


    public transactionController(TransactionService service) {

        this.service = service;
    }

    @GetMapping("transactions")
    public List<Transactions> getTransactions() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUser = principal.toString();

        if ("ADMIN".equalsIgnoreCase(currentUser)) {
            return service.getTransactions();
        }

        return service.getTransactionsByUser(currentUser);
    }

    @PostMapping("deposit")
    public Transactions deposit(@RequestBody transactionRequest request){
        return service.deposit(request);

    }

    @PostMapping("withdraw")
    public Transactions withdraw(@RequestBody transactionRequest request){
        return service.withdraw(request);
    }

    @PostMapping("transfer")
    public Transactions transfer(@RequestBody transactionRequest request){
        return service.Transfer(request);
    }
}


