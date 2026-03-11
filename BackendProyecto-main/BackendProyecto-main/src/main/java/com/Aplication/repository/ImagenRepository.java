/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.repository;

import com.Aplication.modelo.Imagen;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author KEVIN-PC
 */

public interface ImagenRepository extends JpaRepository<Imagen, Long> {
    
    Optional<Imagen> findByNombre(String nombre);
}
