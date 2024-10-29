package com.javaproject.anisa.services.register;

import com.javaproject.anisa.dto.Register.RegisterRequestDto;
import com.javaproject.anisa.entities.Register;

public interface RegisterService {
    Register register(RegisterRequestDto dto);

    // void deleteUser(String email);

    // Users getByEmail(String email);

    // Register getCustomerByEmail(String email);
    
}
