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

    @Transactional
    public Transactions deposit(transactionRequest request, String currentUserEmail){
        Accounts current_account = accRepo.findById(request.getTo_account()).orElseThrow(()-> new EntityNotFoundException("Account Not Found"));
        
        // Ensure account belongs to current user
        if (!current_account.getCustomer().getEmail().equalsIgnoreCase(currentUserEmail)) {
            throw new RuntimeException("Unauthorized: This account does not belong to you");
        }

        // KYC Status Check
        String status = current_account.getCustomer().getStatus();
        if ("Rejected".equalsIgnoreCase(status)) {
            throw new RuntimeException("Account Blocked: Your KYC was rejected. Please contact support.");
        }

        Transactions transactions = new Transactions();
        // Verify PIN for deposit (optional but good for consistency in this app)
        if (request.getPin() == null || request.getPin().isEmpty() || !passwordEncoder.matches(request.getPin(), current_account.getCustomer().getPin())) {
            throw new RuntimeException("Invalid Transaction PIN");
        }

        if (request.getAmount() <= 0){
            throw new RuntimeException("Amount must be greater than zero");
        }
        current_account.setBalance(request.getAmount() + current_account.getBalance());
        accRepo.save(current_account);
        transactions.setTo_account(current_account);
        transactions.setAmount(request.getAmount());
        transactions.setType(request.getType());
        return repo.save(transactions);




    }


    @Transactional
    public Transactions withdraw(transactionRequest request, String currentUserEmail){
        Accounts current_account = accRepo.findById(request.getTo_account()).orElseThrow(()-> new EntityNotFoundException("Account Not Found"));
        
        // Ensure account belongs to current user
        if (!current_account.getCustomer().getEmail().equalsIgnoreCase(currentUserEmail)) {
            throw new RuntimeException("Unauthorized: This account does not belong to you");
        }

        // KYC Status Check for Withdrawal
        String status = current_account.getCustomer().getStatus();
        if (!"Verified".equalsIgnoreCase(status)) {
            String msg = "Rejected".equalsIgnoreCase(status) ? "Account Blocked." : "KYC Pending: Please wait for admin verification.";
            throw new RuntimeException("Access Denied: " + msg);
        }

        Transactions transactions = new Transactions();
        // Verify PIN for withdrawal
        if (request.getPin() == null || request.getPin().isEmpty() || !passwordEncoder.matches(request.getPin(), current_account.getCustomer().getPin())) {
            throw new RuntimeException("Invalid Transaction PIN");
        }

        if (request.getAmount() <= 0){
            throw new RuntimeException("Amount must be greater than zero");
        }
        if(current_account.getBalance() < request.getAmount()){
            throw  new RuntimeException("Insufficient amount");
        }else {
            current_account.setBalance(current_account.getBalance() - request.getAmount());
            accRepo.save(current_account);
            transactions.setTo_account(current_account);
            transactions.setAmount(request.getAmount());
            transactions.setType(request.getType());
            return repo.save(transactions);
        }

    }

    @Transactional
    public Transactions Transfer(transactionRequest request, String currentUserEmail) {
        if (request.getFrom_account() == null || request.getTo_account() == null) {
            throw new RuntimeException("Account IDs cannot be null");
        }

        if (request.getFrom_account().equals(request.getTo_account())) {
            throw new RuntimeException("You cannot transfer money to the same account");
        }

        Accounts current_account = accRepo.findById(request.getFrom_account())
                .orElseThrow(() -> new EntityNotFoundException("Source Account doesn't Exist"));
        
        // Ensure source account belongs to current user
        if (!current_account.getCustomer().getEmail().equalsIgnoreCase(currentUserEmail)) {
            throw new RuntimeException("Unauthorized: This account does not belong to you");
        }

        // KYC Status Check for Transfer
        String status = current_account.getCustomer().getStatus();
        if (!"Verified".equalsIgnoreCase(status)) {
            String msg = "Rejected".equalsIgnoreCase(status) ? "Account Blocked." : "KYC Pending: Please wait for admin verification.";
            throw new RuntimeException("Access Denied: " + msg);
        }

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
