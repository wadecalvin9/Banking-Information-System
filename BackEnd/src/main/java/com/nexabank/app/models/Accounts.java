package com.nexabank.app.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private int balance;


    @Column(insertable = false, updatable = false, columnDefinition = "DATE DEFAULT (CURRENT_DATE)")
    private LocalDateTime opened;

    public LocalDateTime getOpened() {
        return opened;
    }

    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public Accounts(Long id, String type, int balance,  String status, Customer customer) {
        this.id = id;
        this.type = type;
        this.balance = balance;
        this.status = status;
        this.customer = customer;

    }

    public Accounts(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
