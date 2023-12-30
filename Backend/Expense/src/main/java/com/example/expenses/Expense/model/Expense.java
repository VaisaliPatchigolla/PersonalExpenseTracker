package com.example.expenses.Expense.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String Description;
    private Double Amount;
    private LocalDate Date;
    

	public Expense() {
		super();
	}
	public Expense(Long id, String description, Double amount, LocalDate date) {
		super();
		this.Id = id;
		this.Description = description;
		this.Amount = amount;
		this.Date = date;
	}
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public Double getAmount() {
		return Amount;
	}
	public void setAmount(Double amount) {
		Amount = amount;
	}
	public LocalDate getDate() {
		return Date;
	}
	public void setDate(LocalDate date) {
		Date = date;
	}

}