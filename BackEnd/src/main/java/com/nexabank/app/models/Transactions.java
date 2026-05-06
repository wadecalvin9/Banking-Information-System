package com.nexabank.app.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "to_account")
    private Accounts to_account;

    @ManyToOne
    @JoinColumn(name = "from_account")
    private Accounts from_account;

    private  String type;
    private  int amount;

    @Column(insertable = false, updatable = false, columnDefinition = "DATE DEFAULT (CURRENT_DATE)")
    private LocalDate date;

    public  Transactions(){

    }

    public Transactions(Long id, Accounts to_account, Accounts from_account, String type, int amount) {
        this.id = id;
        this.to_account = to_account;
        this.from_account = from_account;
        this.type = type;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }


    public Accounts getTo_account() {
        return to_account;
    }

    public void setTo_account(Accounts to_account) {
        this.to_account = to_account;
    }

    public Accounts getFrom_account() {
        return from_account;
    }

    public void setFrom_account(Accounts from_account) {
        this.from_account = from_account;
    }

    public String getType() {
        return type;
    }

    public int getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setId(Long id) {
        this.id = id;
    }




    public void setType(String type) {
        this.type = type;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
