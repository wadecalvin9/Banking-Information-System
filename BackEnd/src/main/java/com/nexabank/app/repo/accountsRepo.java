package com.nexabank.app.repo;

import com.nexabank.app.models.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface accountsRepo  extends JpaRepository <Accounts, Long> {
    List<Accounts> findByCustomerEmail(String email);
}
