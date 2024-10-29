package com.javaproject.anisa.services.Member;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.javaproject.anisa.dto.Member.MemberRequestDto;
import com.javaproject.anisa.entities.Member;
import com.javaproject.anisa.entities.Superior;

public interface MemberService {

    List<Member> getAll();

   Member add(MemberRequestDto dto);

    Member update(String id,MemberRequestDto dto);

    void delete(String id);

    Member uploadPhoto(String id, MultipartFile file);

    List<Superior> getAllSuperiors();
}
