package com.nexabank.app.dto;

public class transactionRequest {
    private Long to_account;
    private Long from_account;
    private String type;
    private int amount;
    private String pin;

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public Long getTo_account() {
        return to_account;
    }

    public void setTo_account(Long to_account) {
        this.to_account = to_account;
    }

    public Long getFrom_account() {
        return from_account;
    }

    public void setFrom_account(Long from_account) {
        this.from_account = from_account;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
