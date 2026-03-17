package com.Aplication.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "local")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idlocal;
    
    private String local;

    private String direccion;

    private Long telefono;
    
    private String slogan;
    private String descripcion;
    private String ciudad;
    private String email;
    private String sitioWeb;
    private String instagram;
    private String facebook;
    
    @Lob
    private byte[] fotoPrincipal;
    
    @Lob
    private byte[] imagen;


}
