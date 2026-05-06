package com.nexabank.app.repo;

import com.nexabank.app.models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface transactionRepo extends JpaRepository <Transactions, Long>  {
    @Query("SELECT t FROM Transactions t WHERE t.from_account.customer.email = :email OR t.to_account.customer.email = :email")
    List<Transactions> findByFromAccountCustomerEmailOrToAccountCustomerEmail(String email);
}
