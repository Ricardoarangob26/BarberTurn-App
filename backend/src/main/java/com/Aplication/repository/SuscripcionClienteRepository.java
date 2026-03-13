package com.Aplication.repository;

import com.Aplication.modelo.SuscripcionCliente;
import com.Aplication.modelo.UserCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SuscripcionClienteRepository extends JpaRepository<SuscripcionCliente, Long> {
    
    // Obtener todas las suscripciones activas de un cliente (usualmente 1)
    List<SuscripcionCliente> findByClienteAndEstado(UserCliente cliente, String estado);
    
    // Obtener la suscripcion mas reciente
    Optional<SuscripcionCliente> findTopByClienteOrderByFechaFinDesc(UserCliente cliente);
    
    // Obtener suscripciones por estado (ej: para el cron de expiracion)
    List<SuscripcionCliente> findByEstado(String estado);
}
