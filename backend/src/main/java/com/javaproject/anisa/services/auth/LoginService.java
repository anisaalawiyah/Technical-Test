package com.javaproject.anisa.services.auth;

import com.javaproject.anisa.dto.auth.LoginRequestDto;
import com.javaproject.anisa.dto.auth.LoginResponseDto;

public interface LoginService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);

    // void sendForgotPassword(String email);

    // void deleteUser(String email);

    // void requestDeleteAccount(String email);

    String verifyToken(String idToken);
}
