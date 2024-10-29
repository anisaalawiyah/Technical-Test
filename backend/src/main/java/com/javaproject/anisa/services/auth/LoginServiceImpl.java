package com.javaproject.anisa.services.auth;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.javaproject.anisa.dto.auth.LoginRequestDto;
import com.javaproject.anisa.dto.auth.LoginResponseDto;
import com.javaproject.anisa.entities.Register;
import com.javaproject.anisa.repositories.RegisterRepository;
import com.javaproject.anisa.util.JwtUtil;

@Service
public class LoginServiceImpl implements LoginService {

   

    @Autowired
    RegisterRepository registerRepository;

  
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    // private static final Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);

  

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        // Tambahkan log untuk debugging
        System.out.println("Attempting to login with email: " + loginRequestDto.getEmail());
        
        try {
            Register user = registerRepository
                    .findByEmail(loginRequestDto.getEmail())
                    .orElse(null);

            if (user == null) {
                System.out.println("User not found for email: " + loginRequestDto.getEmail());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid username or password");
            }

            boolean isMatch = passwordEncoder.matches(loginRequestDto.getPassword(),
                    user.getPassword());

            if (!isMatch) {
                System.out.println("Password does not match for email: " + loginRequestDto.getEmail());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username or password");
            }

            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setEmail(user.getEmail());
            loginResponseDto.setToken(jwtUtil.generateToken(user));
            return loginResponseDto;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public String verifyToken(String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            return decodedToken.getUid(); // Mengembalikan UID pengguna
        } catch (FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token tidak valid");
        }
    }
}
