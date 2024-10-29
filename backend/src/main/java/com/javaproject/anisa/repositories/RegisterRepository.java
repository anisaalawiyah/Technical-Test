package com.javaproject.anisa.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.anisa.entities.Register;
public interface RegisterRepository extends JpaRepository<Register, String> {

    // @Query("delete from Customer where email=:email")
    // void deleteByEmail(String email);

     Optional<Register> findByEmail(String email);

    // Register save(boolean register);
}
