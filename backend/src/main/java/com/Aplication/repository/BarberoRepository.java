/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.repository;

import com.Aplication.modelo.Barbero;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author KEVIN-PC
 */
public interface BarberoRepository extends JpaRepository<Barbero, Long> {

    public Optional<Barbero> findByNombre(String nombre);

    // Método para buscar un barbero por su correo electrónico
    public Optional<Barbero> findByEmail(String email);
    
    // Método para buscar un barbero por su teléfono
    public Optional<Barbero> findByTelefono(Long telefono);

    // Filtrar barberos por local
    List<Barbero> findByLocal(String local);

    // Filtrar barberos por especialidad
    List<Barbero> findByEspecialidad(String especialidad);

    // Filtrar barberos por estado
    List<Barbero> findByEstado(String estado);
    
}
