package com.Aplication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Aplication.Repository.SolicitudAgendaRepository;
import com.Aplication.modelo.Admin;
import com.Aplication.modelo.Barbero;
import com.Aplication.modelo.SolicitudAgenda;
import com.Aplication.modelodto.SolicitudAgendaDTO;
import com.Aplication.repository.AdminRepository;
import com.Aplication.repository.BarberoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudAgendaService {

    private static final List<String> TIPOS_PERMITIDOS = Arrays.asList(
            "vacaciones", "cambio_horario", "dia_libre", "permiso");
    private static final List<String> ESTADOS_PERMITIDOS = Arrays.asList(
            "pendiente", "aprobada", "rechazada");

    @Autowired
    private SolicitudAgendaRepository repositorio;

    @Autowired
    private BarberoRepository barberoRepository;

    @Autowired
    private AdminRepository adminRepository;

    // ── Conversión a DTO ──────────────────────────────────────────────────────

    private SolicitudAgendaDTO toDTO(SolicitudAgenda s) {
        SolicitudAgendaDTO dto = new SolicitudAgendaDTO();
        dto.setId(s.getId());
        if (s.getBarbero() != null) {
            dto.setBarberoId(s.getBarbero().getId());
            dto.setBarberoNombre(s.getBarbero().getNombre() + " " + s.getBarbero().getApellido());
        }
        dto.setTipo(s.getTipo());
        dto.setFechaInicio(s.getFechaInicio());
        dto.setFechaFin(s.getFechaFin());
        dto.setMotivo(s.getMotivo());
        dto.setEstado(s.getEstado());
        dto.setFechaSolicitud(s.getFechaSolicitud());
        dto.setFechaRespuesta(s.getFechaRespuesta());
        dto.setComentarioAdmin(s.getComentarioAdmin());
        if (s.getAdminResponsable() != null) {
            dto.setAdminId(s.getAdminResponsable().getId());
            dto.setAdminNombre(s.getAdminResponsable().getNombre() + " " + s.getAdminResponsable().getApellido());
        }
        return dto;
    }

    // ── Consultas ─────────────────────────────────────────────────────────────

    public List<SolicitudAgendaDTO> getSolicitudesTodas() {
        return repositorio.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<SolicitudAgendaDTO> getSolicitudesPorBarbero(Long barberoId) {
        return repositorio.findByBarberoId(barberoId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<SolicitudAgendaDTO> getSolicitudesPendientes() {
        return repositorio.findByEstado("pendiente").stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<SolicitudAgendaDTO> getSolicitudesPorEstado(String estado) {
        return repositorio.findByEstado(estado).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<SolicitudAgendaDTO> getSolicitudPorId(Long id) {
        return repositorio.findById(id).map(this::toDTO);
    }

    public List<SolicitudAgendaDTO> getSolicitudesPorFiltro(String estado, String tipo) {
        List<SolicitudAgenda> resultado;
        if (estado != null && tipo != null) {
            resultado = repositorio.findByEstadoAndTipo(estado, tipo);
        } else if (estado != null) {
            resultado = repositorio.findByEstado(estado);
        } else if (tipo != null) {
            resultado = repositorio.findByTipo(tipo);
        } else {
            resultado = repositorio.findAll();
        }
        return resultado.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // ── Crear ─────────────────────────────────────────────────────────────────

    @Transactional
    public SolicitudAgendaDTO crearSolicitud(SolicitudAgenda solicitud) {
        validarTipo(solicitud.getTipo());
        validarFechas(solicitud.getFechaInicio(), solicitud.getFechaFin());

        if (solicitud.getBarbero() == null || solicitud.getBarbero().getId() == null) {
            throw new IllegalArgumentException("Debe especificar un barbero válido");
        }
        Barbero barbero = barberoRepository.findById(solicitud.getBarbero().getId())
                .orElseThrow(() -> new IllegalArgumentException("Barbero no encontrado"));

        if (verificarConflictos(barbero.getId(), solicitud.getFechaInicio(), solicitud.getFechaFin())) {
            throw new IllegalArgumentException(
                    "Ya existe una solicitud aprobada que se superpone con las fechas indicadas");
        }

        solicitud.setBarbero(barbero);
        solicitud.setEstado("pendiente");
        solicitud.setFechaSolicitud(LocalDateTime.now());
        solicitud.setFechaRespuesta(null);
        solicitud.setComentarioAdmin(null);
        solicitud.setAdminResponsable(null);

        return toDTO(repositorio.save(solicitud));
    }

    // ── Aprobar / Rechazar ────────────────────────────────────────────────────

    @Transactional
    public SolicitudAgendaDTO aprobarSolicitud(Long solicitudId, String comentario, Long adminId) {
        SolicitudAgenda solicitud = repositorio.findById(solicitudId)
                .orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada"));

        if (!"pendiente".equals(solicitud.getEstado())) {
            throw new IllegalStateException("Solo se pueden aprobar solicitudes en estado pendiente");
        }

        Admin admin = null;
        if (adminId != null) {
            admin = adminRepository.findById(adminId).orElse(null);
        }

        solicitud.setEstado("aprobada");
        solicitud.setFechaRespuesta(LocalDateTime.now());
        solicitud.setComentarioAdmin(comentario);
        solicitud.setAdminResponsable(admin);

        return toDTO(repositorio.save(solicitud));
    }

    @Transactional
    public SolicitudAgendaDTO rechazarSolicitud(Long solicitudId, String motivo, Long adminId) {
        SolicitudAgenda solicitud = repositorio.findById(solicitudId)
                .orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada"));

        if (!"pendiente".equals(solicitud.getEstado())) {
            throw new IllegalStateException("Solo se pueden rechazar solicitudes en estado pendiente");
        }

        Admin admin = null;
        if (adminId != null) {
            admin = adminRepository.findById(adminId).orElse(null);
        }

        solicitud.setEstado("rechazada");
        solicitud.setFechaRespuesta(LocalDateTime.now());
        solicitud.setComentarioAdmin(motivo);
        solicitud.setAdminResponsable(admin);

        return toDTO(repositorio.save(solicitud));
    }

    // ── Eliminar ──────────────────────────────────────────────────────────────

    @Transactional
    public void eliminarSolicitud(Long id) {
        SolicitudAgenda solicitud = repositorio.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada"));

        if (!"pendiente".equals(solicitud.getEstado())) {
            throw new IllegalStateException("Solo se pueden eliminar solicitudes en estado pendiente");
        }
        repositorio.deleteById(id);
    }

    // ── Validaciones ──────────────────────────────────────────────────────────

    public boolean validarFechas(LocalDate inicio, LocalDate fin) {
        if (inicio == null || fin == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin son obligatorias");
        }
        if (inicio.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("No se permiten solicitudes con fechas retroactivas");
        }
        if (fin.isBefore(inicio)) {
            throw new IllegalArgumentException("La fecha de fin debe ser igual o posterior a la fecha de inicio");
        }
        return true;
    }

    public boolean verificarConflictos(Long barberoId, LocalDate inicio, LocalDate fin) {
        return repositorio.findByBarberoIdAndEstado(barberoId, "aprobada").stream()
                .anyMatch(s -> !inicio.isAfter(s.getFechaFin()) && !fin.isBefore(s.getFechaInicio()));
    }

    private void validarTipo(String tipo) {
        if (tipo == null || !TIPOS_PERMITIDOS.contains(tipo)) {
            throw new IllegalArgumentException(
                    "Tipo inválido. Valores permitidos: " + String.join(", ", TIPOS_PERMITIDOS));
        }
    }
}
