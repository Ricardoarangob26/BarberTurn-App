package com.Aplication.service;

import com.Aplication.modelo.Licencia;
import com.Aplication.repository.LicenciaRepository;
import com.Aplication.repository.SuscripcionClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LicenciaService {

    @Autowired
    private LicenciaRepository licenciaRepository;

    @Autowired
    private SuscripcionClienteRepository suscripcionRepository;

    public List<Licencia> getAllLicencias() {
        return licenciaRepository.findAll();
    }

    public List<Licencia> getLicenciasActivas() {
        return licenciaRepository.findByActivaTrue();
    }

    public Optional<Licencia> getLicenciaById(Long id) {
        return licenciaRepository.findById(id);
    }

    @Transactional
    public Licencia crearLicencia(Licencia licencia) {
        return licenciaRepository.save(licencia);
    }

    @Transactional
    public Licencia actualizarLicencia(Long id, Licencia datosActualizados) {
        Licencia licencia = licenciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Licencia no encontrada con id: " + id));

        licencia.setNombre(datosActualizados.getNombre());
        licencia.setDescripcion(datosActualizados.getDescripcion());
        licencia.setPrecioMensual(datosActualizados.getPrecioMensual());
        licencia.setActiva(datosActualizados.getActiva());
        licencia.setDuracionDias(datosActualizados.getDuracionDias());
        licencia.setColor(datosActualizados.getColor());
        licencia.setNivel(datosActualizados.getNivel());
        licencia.setBeneficios(datosActualizados.getBeneficios());

        return licenciaRepository.save(licencia);
    }

    @Transactional
    public void eliminarLicencia(Long id) {
        Licencia licencia = licenciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Licencia no encontrada con id: " + id));

        // Verificar si la licencia específica tiene suscripciones activas
        boolean tieneActivas = suscripcionRepository.findByEstado("ACTIVA")
                .stream()
                .anyMatch(s -> s.getLicencia().getId().equals(id));

        if (tieneActivas) {
            throw new RuntimeException("No se puede eliminar la licencia porque tiene suscripciones activas asociadas");
        }

        licenciaRepository.delete(licencia);
    }
}
