package com.example.expenses.Expense.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expenses.Expense.model.User;
import com.example.expenses.Expense.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

 @Autowired
 private AdminRepository adminRepository; 

 public User getUserById(Long userId) {
     return adminRepository.findById(userId).orElse(null);
 }

 public List<User> getAllUsers() {
     return adminRepository.findAll();
 }

 public User registerUser(User user) {
    
     return adminRepository.save(user);
 }

 public User verifyUser(String username, String password) {
     return adminRepository.findByUsernameAndPassword(username, password);
 }

 public void logout() {
     
 }

 public User saveUser(User user) {
     return adminRepository.save(user);
 }

 public void deleteUser(Long userId) {
     adminRepository.deleteById(userId);
 }
}