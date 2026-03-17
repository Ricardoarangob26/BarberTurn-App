package com.Aplication.repository;

import com.Aplication.modelo.Licencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LicenciaRepository extends JpaRepository<Licencia, Long> {
    Optional<Licencia> findByNombre(String nombre);
    List<Licencia> findByActivaTrue();
    List<Licencia> findByNivel(String nivel);
}
