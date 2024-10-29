package com.javaproject.anisa.entities;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private String position;

    @ManyToOne
    @JoinColumn(name = "idSuperior",referencedColumnName = "id", insertable = true, unique = false)
    private Superior Superior;

    @Lob
    @Column(name = "photo")
    @JsonIgnore
    private Blob photo;

    @JsonProperty("photo")
    public String getPhotoBase64() throws SQLException {
        if (photo != null)
            return new String(Base64.getEncoder().encode(photo.getBytes(1L, (int) photo.length())));
        return null;
    }

 
}
