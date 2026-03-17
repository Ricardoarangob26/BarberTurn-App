package com.Aplication.service;

import com.Aplication.modelo.Licencia;
import com.Aplication.modelo.SuscripcionCliente;
import com.Aplication.modelo.UserCliente;
import com.Aplication.modelodto.SuscripcionDTO;
import com.Aplication.repository.LicenciaRepository;
import com.Aplication.repository.SuscripcionClienteRepository;
import com.Aplication.repository.UserClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SuscripcionService {

    @Autowired
    private LicenciaRepository licenciaRepository;
    
    @Autowired
    private SuscripcionClienteRepository suscripcionRepository;
    
    @Autowired
    private UserClienteRepository clienteRepository;

    public List<Licencia> getAllLicenciasActivas() {
        return licenciaRepository.findByActivaTrue();
    }

    @Transactional
    public SuscripcionCliente adquirirSuscripcion(String username, Long licenciaId, String metodoPago) {
        UserCliente cliente = clienteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
                
        Licencia licencia = licenciaRepository.findById(licenciaId)
                .orElseThrow(() -> new RuntimeException("Licencia no encontrada"));
                
        // Cancelar suscripción anterior si estaba activa
        List<SuscripcionCliente> previas = suscripcionRepository.findByClienteAndEstado(cliente, "ACTIVA");
        for (SuscripcionCliente previa : previas) {
            previa.setEstado("CANCELADA");
            suscripcionRepository.save(previa);
        }

        int duracionDias = licencia.getDuracionDias() != null ? licencia.getDuracionDias() : 30;

        SuscripcionCliente nuevaSuscripcion = SuscripcionCliente.builder()
                .cliente(cliente)
                .licencia(licencia)
                .fechaInicio(LocalDate.now())
                .fechaFin(LocalDate.now().plusDays(duracionDias))
                .estado("ACTIVA")
                .metodoPago(metodoPago)
                .build();
                
        return suscripcionRepository.save(nuevaSuscripcion);
    }
    
    public Optional<SuscripcionCliente> getSuscripcionActiva(String username) {
         UserCliente cliente = clienteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
                
        List<SuscripcionCliente> activas = suscripcionRepository.findByClienteAndEstado(cliente, "ACTIVA");
        if(activas.isEmpty()) return Optional.empty();
        return Optional.of(activas.get(0));
    }

    // --- Métodos adicionales para administración ---

    public List<SuscripcionDTO> getAllSuscripciones() {
        return suscripcionRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SuscripcionDTO cancelarSuscripcion(Long suscripcionId) {
        SuscripcionCliente suscripcion = suscripcionRepository.findById(suscripcionId)
                .orElseThrow(() -> new RuntimeException("Suscripción no encontrada con id: " + suscripcionId));

        suscripcion.setEstado("CANCELADA");
        return toDTO(suscripcionRepository.save(suscripcion));
    }

    public long getSuscripcionesActivasCount() {
        return suscripcionRepository.countByEstado("ACTIVA");
    }

    public Optional<SuscripcionDTO> getSuscripcionPorUsuario(Long userId) {
        List<SuscripcionCliente> activas = suscripcionRepository.findByClienteIdAndEstado(userId, "ACTIVA");
        if (activas.isEmpty()) return Optional.empty();
        return Optional.of(toDTO(activas.get(0)));
    }

    public List<SuscripcionDTO> getSuscripcionesPorUsuario(Long userId) {
        return suscripcionRepository.findByClienteId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private SuscripcionDTO toDTO(SuscripcionCliente s) {
        UserCliente cliente = s.getCliente();
        Licencia licencia = s.getLicencia();
        return SuscripcionDTO.builder()
                .id(s.getId())
                .clienteId(cliente != null ? cliente.getId() : null)
                .clienteUsername(cliente != null ? cliente.getUsername() : null)
                .licenciaId(licencia != null ? licencia.getId() : null)
                .licenciaNombre(licencia != null ? licencia.getNombre() : null)
                .licenciaNivel(licencia != null ? licencia.getNivel() : null)
                .licenciaPrecioMensual(licencia != null ? licencia.getPrecioMensual() : null)
                .fechaInicio(s.getFechaInicio())
                .fechaFin(s.getFechaFin())
                .estado(s.getEstado())
                .metodoPago(s.getMetodoPago())
                .build();
    }
}
