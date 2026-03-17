package com.Aplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Aplication.modelo.SolicitudAgenda;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SolicitudAgendaRepository extends JpaRepository<SolicitudAgenda, Long> {

    List<SolicitudAgenda> findByBarberoId(Long barberoId);

    List<SolicitudAgenda> findByEstado(String estado);

    List<SolicitudAgenda> findByTipo(String tipo);

    List<SolicitudAgenda> findByFechaInicioBetween(LocalDate inicio, LocalDate fin);

    List<SolicitudAgenda> findByBarberoIdAndEstado(Long barberoId, String estado);

    List<SolicitudAgenda> findByEstadoAndTipo(String estado, String tipo);
}
