package com.Aplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Aplication.modelo.SolicitudAgenda;
import java.util.List;

@Repository
public interface SolicitudAgendaRepository extends JpaRepository<SolicitudAgenda, Long> {
    List<SolicitudAgenda> findByBarberoId(Long idBarbero);
}
