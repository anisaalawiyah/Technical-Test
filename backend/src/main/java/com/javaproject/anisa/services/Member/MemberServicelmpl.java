package com.javaproject.anisa.services.Member;

import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.javaproject.anisa.dto.Member.MemberRequestDto;
import com.javaproject.anisa.entities.Member;
import com.javaproject.anisa.entities.Superior;
import com.javaproject.anisa.repositories.MemberRepository;
import com.javaproject.anisa.repositories.SuperiorRepository;
        





@Service
public class MemberServicelmpl implements MemberService {

   @Autowired
   MemberRepository memberRepository;

    @Autowired
    SuperiorRepository superiorRepository;

    @Override
    public List<Member> getAll() {
        try{
            
            return memberRepository.findAll();
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public Member add(MemberRequestDto dto) {
        try{    
            Member newMember = new Member();
            Superior superior = superiorRepository.findById(dto.getIdSuperior()).orElse(null);
            if(superior == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Superior Not Found");
            newMember.setName(dto.getName());
            newMember.setPosition(dto.getPosition());
            newMember.setSuperior(superior);
            return memberRepository.save(newMember);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public Member update(String id,MemberRequestDto dto) {
        try{
            Member member = memberRepository.findById(id).orElse(null);
            Superior superior = superiorRepository.findById(dto.getIdSuperior()).orElse(null);  
            if(member == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Member Not Found");
            if(superior == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Superior Not Found");
            member.setName(dto.getName());
            member.setPosition(dto.getPosition());
            member.setSuperior(superior);
            return memberRepository.save(member);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public void delete(String id) {
        try{
            Member member = memberRepository.findById(id).orElse(null);
            if(member == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Member Not Found");
            memberRepository.delete(member);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public Member uploadPhoto(String id, MultipartFile file) {
        try {
            int index = 0;
            String extension = file.getOriginalFilename();
            Member member = memberRepository.findById(id).orElse(null);
            if (extension == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File Not Support");

            index = extension.lastIndexOf(".");

            if (!extension.substring(index + 1).equalsIgnoreCase("jpg")
                    && !extension.substring(index + 1).equalsIgnoreCase("jpeg")
                    && !extension.substring(index + 1).equalsIgnoreCase("png"))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "File Not Supported! (Only jpg, jpeg and png acceptable)");
            if (member == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Member Not Found");

            member.setPhoto(new SerialBlob(file.getBytes()));
            return memberRepository.save(member);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public List<Superior> getAllSuperiors() {
        try{
            return superiorRepository.findAll();
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }


    

    

   
}
