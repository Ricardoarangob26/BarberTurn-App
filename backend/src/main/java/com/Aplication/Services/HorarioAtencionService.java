package com.Aplication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Aplication.Repository.HorarioAtencionRepository;
import com.Aplication.modelo.HorarioAtencion;
import com.Aplication.modelodto.HorarioAtencionDTO;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HorarioAtencionService {
    
    @Autowired
    private HorarioAtencionRepository repositorio;
    
    public List<HorarioAtencionDTO> findByLocal(Long idlocal) {
        return repositorio.findByLocalIdlocal(idlocal).stream().map(h -> new HorarioAtencionDTO(
            h.getId(), h.getLocal() != null ? h.getLocal().getIdlocal() : null, 
            h.getDiaSemana(), h.getAbierto(), h.getApertura(), h.getCierre()
        )).collect(Collectors.toList());
    }
    
    public HorarioAtencion save(HorarioAtencion horario) {
        return repositorio.save(horario);
    }
    
    public void delete(Long id) {
        repositorio.deleteById(id);
    }
}
