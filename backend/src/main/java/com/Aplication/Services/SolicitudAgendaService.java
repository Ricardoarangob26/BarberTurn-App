package com.Aplication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Aplication.Repository.SolicitudAgendaRepository;
import com.Aplication.modelo.SolicitudAgenda;
import com.Aplication.modelodto.SolicitudAgendaDTO;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitudAgendaService {
    
    @Autowired
    private SolicitudAgendaRepository repositorio;
    
    public List<SolicitudAgendaDTO> findByBarbero(Long idBarbero) {
        return repositorio.findByBarberoId(idBarbero).stream().map(s -> new SolicitudAgendaDTO(
            s.getId(), s.getBarbero() != null ? s.getBarbero().getId() : null, 
            s.getBarbero() != null ? s.getBarbero().getNombre() + " " + s.getBarbero().getApellido() : "",
            s.getTipo(), s.getFechaInicio(), s.getFechaFin(), s.getMotivo(), s.getEstado(), s.getFechaSolicitud()
        )).collect(Collectors.toList());
    }
    
    public SolicitudAgenda save(SolicitudAgenda solicitud) {
        return repositorio.save(solicitud);
    }
    
    public void delete(Long id) {
        repositorio.deleteById(id);
    }
}
