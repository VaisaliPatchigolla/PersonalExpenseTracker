package com.example.expenses.Expense.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expenses.Expense.model.User;
import com.example.expenses.Expense.service.AdminService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/admin/users")
public class AdminController {

 @Autowired
 private AdminService adminService;

 @GetMapping("/{userId}")
 public ResponseEntity<User> getUserById(@PathVariable Long userId) {
     User user = adminService.getUserById(userId);
     return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
 }

 @GetMapping("/all")
 public ResponseEntity<List<User>> getAllUsers() {
     List<User> users = adminService.getAllUsers();
     return ResponseEntity.ok(users);
 }

 @PostMapping("/register")
 public ResponseEntity<User> registerUser(@RequestBody User user) {
     User registeredUser = adminService.registerUser(user);
     return ResponseEntity.ok(registeredUser);
 }

 @PostMapping("/login")
 public ResponseEntity<String> userLogin(@RequestBody Map<String, String> credentials) {
     String username = credentials.get("username");
     String password = credentials.get("password");

     User user = adminService.verifyUser(username, password);
     if (user != null) {
         return ResponseEntity.ok("User logged in successfully");
     }
     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User authentication failed");
 }

 @PostMapping("/logout")
 public ResponseEntity<String> userLogout() {
     adminService.logout();
     return ResponseEntity.ok("User logged out successfully");
 }

 @PutMapping("/update/{userId}")
 public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
     User existingUser = adminService.getUserById(userId);

     if (existingUser != null) {
         existingUser.setUsername(updatedUser.getUsername());
         existingUser.setPassword(updatedUser.getPassword());

         // Update other user details as needed

         User savedUser = adminService.saveUser(existingUser);
         return ResponseEntity.ok(savedUser);
     } else {
         return ResponseEntity.notFound().build();
     }
 }

 @DeleteMapping("/delete/{userId}")
 public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
     adminService.deleteUser(userId);
     return ResponseEntity.noContent().build();
 }
}