package com.nexabank.app.service;

import com.nexabank.app.dto.transactionRequest;
import com.nexabank.app.models.Accounts;
import com.nexabank.app.models.Transactions;
import com.nexabank.app.repo.accountsRepo;
import com.nexabank.app.repo.transactionRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TransactionService {

    private final transactionRepo repo;
    private final accountsRepo accRepo;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public TransactionService(transactionRepo repo, accountsRepo accRepo, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.accRepo = accRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Transactions> getTransactions(){
        return repo.findAll();
    }

    public List<Transactions> getTransactionsByUser(String email) {
        return repo.findByFromAccountCustomerEmailOrToAccountCustomerEmail(email);
    }

    public Transactions deposit(@RequestBody transactionRequest request){
        Accounts current_account = accRepo.findById(request.getTo_account()).orElseThrow(()-> new EntityNotFoundException("Account Not Found"));
        Transactions transactions = new Transactions();
        if (request.getAmount() <= 0){

            throw new RuntimeException("Amount must be grater than zero");
        }
            current_account.setBalance(request.getAmount() + current_account.getBalance());
            transactions.setTo_account(current_account);
            transactions.setAmount(request.getAmount());
            transactions.setType(request.getType());
            return repo.save(transactions);




    }


    public Transactions withdraw(@RequestBody transactionRequest request){
        Accounts current_account = accRepo.findById(request.getTo_account()).orElseThrow(()-> new EntityNotFoundException("Account Not Found"));
        Transactions transactions = new Transactions();
        if (request.getAmount() <= 0){

            throw new RuntimeException("Amount must be greater than zero");
        }
        if(current_account.getBalance() < request.getAmount()){
            throw  new RuntimeException("Insufficient amount");
        }else {
            current_account.setBalance(current_account.getBalance() - request.getAmount());
            transactions.setTo_account(current_account);
            transactions.setAmount(request.getAmount());
            transactions.setType(request.getType());
            return repo.save(transactions);

        }

    }

    @Transactional
    public Transactions Transfer(@RequestBody transactionRequest request) {
        if (request.getFrom_account() == null || request.getTo_account() == null) {
            throw new RuntimeException("Account IDs cannot be null");
        }

        Accounts current_account = accRepo.findById(request.getFrom_account())
                .orElseThrow(() -> new EntityNotFoundException("Source Account doesn't Exist"));
        Accounts other_account = accRepo.findById(request.getTo_account())
                .orElseThrow(() -> new EntityNotFoundException("Destination Account does not Exist"));

        // Verify PIN
        if (request.getPin() == null || !passwordEncoder.matches(request.getPin(), current_account.getCustomer().getPin())) {
            throw new RuntimeException("Invalid Transaction PIN");
        }

        if (request.getAmount() <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }
        if (current_account.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient Balance");
        } else {
            current_account.setBalance(current_account.getBalance() - request.getAmount());
        }
        other_account.setBalance(other_account.getBalance() + request.getAmount());

        Transactions transactions = new Transactions();
        transactions.setType("Transfer");
        transactions.setAmount(request.getAmount());
        transactions.setFrom_account(current_account);
        transactions.setTo_account(other_account);
        return repo.save(transactions);
    }


}
