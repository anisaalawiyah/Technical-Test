package com.javaproject.anisa.services.register;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.javaproject.anisa.dto.Register.RegisterRequestDto;
import com.javaproject.anisa.entities.Register;
import com.javaproject.anisa.repositories.RegisterRepository;

import jakarta.transaction.Transactional;

@Service
public class RegisterServicelmpl implements RegisterService {

    @Autowired
    RegisterRepository registerRepository;
    
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public Register register(RegisterRequestDto dto) {
        try {

            boolean register = registerRepository.findAll().stream()
                    .anyMatch(data -> data.getEmail().equalsIgnoreCase(dto.getEmail()));

            if (register)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email telah terdaftar");

            Register newRegister = new Register(); // Ganti nama variabel untuk menghindari duplikasi
            newRegister.setName(dto.getName());
            newRegister.setEmail(dto.getEmail());
            newRegister.setAddress(dto.getAddress());
            newRegister.setPassword(passwordEncoder.encode(dto.getPassword())); // Menggunakan PasswordEncoder untuk meng-hash kata sandi
            newRegister.setPhoneNumber(dto.getPhoneNumber());
        
        
            return registerRepository.save(newRegister);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // private void sendEmail(String to) {
    //     String subject = "Customer Registration";
    //     String text = "Selamat anda berhasil mendaftar";

    //     emailService.sendMailMessage(to, subject, text);
    // }

    // @Override
    // public void deleteUser(String email) {
    //     customerRepository.deleteByEmail(email);
    // }

    // @Override
    // public Users getByEmail(String email) {

    //     try {

    //         return registerRepository.findByUsername(email).orElse(null);
    //     } catch (Exception e) {
    //         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    //     }
    // }

    // @Override
    // public Register getCustomerByEmail(String email) {

    //     try {
    //         Register customer = registerRepository.findByEmail(email).orElse(null);
    //         if (customer != null)
    //             return customer;
    //         else
    //             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
    //     } catch (Exception e) {

    //         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    //     }
    // }

}
