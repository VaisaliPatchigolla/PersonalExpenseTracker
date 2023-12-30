package com.example.expenses.Expense.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expenses.Expense.model.User;
import com.example.expenses.Expense.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User verifyUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public void logout() {
    }
}