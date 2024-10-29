package com.javaproject.anisa.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import com.javaproject.anisa.security.JwtFilter;



@Configuration
@EnableWebSecurity
public class SpringSecurity {

        @Bean
        PasswordEncoder getPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Autowired
        JwtFilter jwtFilter;
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**", 
                    "/api/customer/register", "/api/auth/login","api/auth/verify-token" ,"/api/member/add-member", "/api/member/all-superior","/api/member/uploadPhoto"
                   ).permitAll()
                    .requestMatchers("/api/member/update/{idRoom}", "/api/member/get-member", "/api/member/all-member").authenticated()
                    // Menambahkan izin untuk POST, GET, dan PUT
                    .requestMatchers(HttpMethod.POST, "/api/member/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/member/**").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/api/member/**").authenticated()
                    .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
            
            return http.build();
        }

}
