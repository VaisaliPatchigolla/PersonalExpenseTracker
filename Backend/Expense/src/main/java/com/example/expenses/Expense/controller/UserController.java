package com.example.expenses.Expense.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expenses.Expense.model.User;
import com.example.expenses.Expense.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

 @Autowired
 private UserService userService;

 @PostMapping("/register")
 public ResponseEntity<User> registerUser(@RequestBody User user) {
     User registeredUser = userService.registerUser(user);
     return ResponseEntity.ok(registeredUser);
 }

 @PostMapping("/login")
 public ResponseEntity<String> userLogin(@RequestBody Map<String, String> credentials) {
     String username = credentials.get("username");
     String password = credentials.get("password");

     User user = userService.verifyUser(username, password);
     if (user != null) {
         return ResponseEntity.ok("User logged in successfully");
     }
     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User authentication failed");
 }

 @PostMapping("/logout")
 public ResponseEntity<String> userLogout() {
     userService.logout();
     return ResponseEntity.ok("User logged out successfully");
 }
}