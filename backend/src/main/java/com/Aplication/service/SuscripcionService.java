package com.Aplication.service;

import com.Aplication.modelo.Licencia;
import com.Aplication.modelo.SuscripcionCliente;
import com.Aplication.modelo.UserCliente;
import com.Aplication.repository.LicenciaRepository;
import com.Aplication.repository.SuscripcionClienteRepository;
import com.Aplication.repository.UserClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

        SuscripcionCliente nuevaSuscripcion = SuscripcionCliente.builder()
                .cliente(cliente)
                .licencia(licencia)
                .fechaInicio(LocalDate.now())
                .fechaFin(LocalDate.now().plusMonths(1)) // Suscripción mensual por defecto
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
}
