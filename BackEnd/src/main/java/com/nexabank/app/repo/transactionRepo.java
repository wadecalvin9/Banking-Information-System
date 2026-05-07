package com.nexabank.app.repo;

import com.nexabank.app.models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface transactionRepo extends JpaRepository <Transactions, Long>  {

    @Query(value = """
            SELECT t.* FROM transactions t
            LEFT JOIN accounts fa ON t.from_account = fa.id
            LEFT JOIN accounts ta ON t.to_account = ta.id
            LEFT JOIN customer fc ON fa.customer_id = fc.id
            LEFT JOIN customer tc ON ta.customer_id = tc.id
            WHERE fc.email = :email OR tc.email = :email
            ORDER BY t.id DESC
            """, nativeQuery = true)
    List<Transactions> findByFromAccountCustomerEmailOrToAccountCustomerEmail(@Param("email") String email);
}
