/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.repository;

import com.Aplication.modelo.Turno;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TurnoRepository extends JpaRepository<Turno, Long> {
    
     Optional<Turno> findByBarberoAndLocalAndFechaAndHora(String barbero, String local, LocalDate fecha, String hora);
     
     // Buscar turnos para una fecha específica y dentro de un rango de hora
    List<Turno> findByFechaAndHoraBetween(LocalDate fecha, String horaInicio, String horaFin);

    // Filtrar turnos por nombre de barbero
    List<Turno> findByBarbero(String barbero);

    // Filtrar turnos por nombre de local
    List<Turno> findByLocal(String local);

    // Filtrar turnos por nombre de cliente
    List<Turno> findByCliente(String cliente);

    // Filtrar turnos por fecha
    List<Turno> findByFecha(LocalDate fecha);

    // Filtrar turnos disponibles por fecha y barbero
    List<Turno> findByFechaAndBarberoAndEstado(LocalDate fecha, String barbero, String estado);

    // Filtrar turnos disponibles solo por fecha
    List<Turno> findByFechaAndEstado(LocalDate fecha, String estado);
}
