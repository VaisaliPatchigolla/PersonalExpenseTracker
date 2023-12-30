package com.example.expenses.Expense.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.expenses.Expense.model.User;
@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
	List<User> findAll();
    Optional<User> findById(Long userId);
    Optional<User> findByUsername(String username);
    User save(User user);
    void deleteById(Long userId);
    User findByUsernameAndPassword(String username, String password);


}
