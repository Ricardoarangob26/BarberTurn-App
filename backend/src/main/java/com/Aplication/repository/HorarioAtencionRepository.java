package com.Aplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Aplication.modelo.HorarioAtencion;
import java.util.List;

@Repository
public interface HorarioAtencionRepository extends JpaRepository<HorarioAtencion, Long> {
    List<HorarioAtencion> findByLocalIdlocal(Long idlocal);
}
