package com.javaproject.anisa.controllers.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.javaproject.anisa.constants.MessageConstant;
import com.javaproject.anisa.dto.GeneralResponse;
import com.javaproject.anisa.dto.Register.RegisterRequestDto;
import com.javaproject.anisa.entities.Register;
import com.javaproject.anisa.services.register.RegisterService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin (origins = "http://localhost:5173", allowCredentials = "true")
@Slf4j
@RestController
@RequestMapping("/api/customer")
@Tag(name = "Costumer")
public class RegisterController {

    @Autowired
    RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequestDto dto) {
        try {
            Register response = registerService.register(dto);
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(response,
                            MessageConstant.OK_POST_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getReason());
            return ResponseEntity.status(e.getStatusCode())
                    .body(GeneralResponse.error(MessageConstant.BAD_REQUEST));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }

    // @SecurityRequirement(name = "Bearer Authentication")
    // @GetMapping("/get-user")
    // public ResponseEntity<Object> getUser(@RequestParam String email) {
    //     try {
            
    //         return ResponseEntity.ok()
    //                 .body(GeneralResponse.success(registerService.getE(email),
    //                         MessageConstant.OK_GET_DATA));
    //     } catch (ResponseStatusException e) {
    //         log.info(e.getReason());
    //         return ResponseEntity.status(e.getStatusCode())
    //                 .body(GeneralResponse.error(MessageConstant.BAD_REQUEST));
    //     } catch (Exception e) {
    //         log.info(e.getMessage());
    //         return ResponseEntity.internalServerError()
    //                 .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
    //     }
    // }
}
