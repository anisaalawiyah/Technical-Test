package com.javaproject.anisa.controllers.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.javaproject.anisa.constants.MessageConstant;
import com.javaproject.anisa.dto.GeneralResponse;
import com.javaproject.anisa.dto.Member.MemberRequestDto;
import com.javaproject.anisa.dto.Member.MemberResponDto;
import com.javaproject.anisa.entities.Member;
import com.javaproject.anisa.entities.Superior;
import com.javaproject.anisa.services.Member.MemberService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin (origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@Slf4j
@RequestMapping("/api/member")
@Tag(name = "member")
public class MemberController {

  

    @Autowired
   MemberService memberService;

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/all-member")
    ResponseEntity<Object> getMember() {
        try {
            // Mengambil semua anggota
            List<Member> members = memberService.getAll();
            // Memetakan anggota untuk hanya menampilkan nama dan posisi
            List<MemberResponDto> response = members.stream()
                .map(member -> new MemberResponDto(member.getName(), member.getPosition()))
                .collect(Collectors.toList());
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(response, MessageConstant.OK_GET_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/get-member")
    ResponseEntity<Object> getAllMember() {
        try {
            // Memanggil metode getAll() dari instance memberService
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(this.memberService.getAll(), MessageConstant.OK_GET_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }
    @GetMapping("/all-superior")
    ResponseEntity<Object> getSuperiors() {
        try {
            List<Superior> superiors = memberService.getAllSuperiors();
            log.info("Superiors found: {}", superiors);
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(superiors, MessageConstant.OK_GET_DATA)); // Mengembalikan superiors langsung
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }
    // @SecurityRequirement(name = "Bearer Authentication")
    // @GetMapping("/get-room")
    // ResponseEntity<Object> getRoom(@RequestParam String idRoom) {
    //     try {

    //         return ResponseEntity.ok()
    //                 .body(GeneralResponse.success(memberService.getRoomById(idRoom), MessageConstant.OK_GET_DATA));
    //     } catch (ResponseStatusException e) {
    //         log.info(e.getMessage());
    //         return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
    //     } catch (Exception e) {
    //         log.info(e.getMessage());
    //         return ResponseEntity.internalServerError()
    //                 .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
    //     }
    // }

    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping(value = "/add-member")
    ResponseEntity<Object> add(@RequestBody MemberRequestDto dto) {
        try {
            // Tambahkan log untuk memeriksa token dan permisi
            log.info("Attempting to add member with data: {}", dto);
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(memberService.add(dto), MessageConstant.OK_POST_DATA));
        } catch (ResponseStatusException e) {
            log.info("ResponseStatusException: {}", e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.error("Exception occurred: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/update/{id}")
    ResponseEntity<Object> updateMember(@PathVariable String id, @RequestBody MemberRequestDto dto) {

        try {

            return ResponseEntity.ok()
                    .body(GeneralResponse.success(memberService.update(id, dto), MessageConstant.OK_PUT_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }


    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/uploadPhoto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<Object> updatePhoto(@RequestParam String id, @RequestParam MultipartFile file) {

        try {

            memberService.uploadPhoto(id, file);
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(null, MessageConstant.OK_PUT_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/delete-member")
    ResponseEntity<Object> deleteMember(@RequestParam String id) {

        try {
            memberService.delete(id);
            return ResponseEntity.ok()
                    .body(GeneralResponse.success(null, MessageConstant.OK_DELETE_DATA));
        } catch (ResponseStatusException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(e.getStatusCode()).body(GeneralResponse.error(e.getReason()));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(GeneralResponse.error(MessageConstant.INTERNAL_SERVER_ERROR));
        }
    }


}
