package com.nexabank.app.dto;

public class accountsDTO {
    private Long id;
    private int balance;
    private String status;
    private Long customer_id;

    public accountsDTO(Long id, int balance, String status, Long customer_id) {
        this.id = id;
        this.balance = balance;
        this.status = status;
        this.customer_id = customer_id;
    }

    public Long getId() {
        return id;
    }

    public int getBalance() {
        return balance;
    }

    public String getStatus() {
        return status;
    }

    public Long getCustomer_id() {
        return customer_id;
    }
}
