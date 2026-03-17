package com.Aplication.repository;

import com.Aplication.modelo.Barberia;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberiaRepository extends JpaRepository<Barberia, Long> {

    Optional<Barberia> findByNombre(String nombre);

    List<Barberia> findByCiudad(String ciudad);
}
