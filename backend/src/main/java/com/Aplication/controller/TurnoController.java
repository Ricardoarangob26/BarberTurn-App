package com.Aplication.controller;

import com.Aplication.Services.TurnoService;
import com.Aplication.modelo.Turno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turno")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    // Crear un nuevo Turno
    @PostMapping("/post")
    public ResponseEntity<?> createTurno(@RequestBody Turno turno) {
        try {
            Turno nuevoTurno = turnoService.saveOrUpdate(turno);
            return new ResponseEntity<>(nuevoTurno, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Este turno ya está reservado para esta fecha y hora con este barbero en el local especificado.", HttpStatus.CONFLICT);
        }
    }

    // Obtener todos los turnos
    @GetMapping
    public ResponseEntity<List<Turno>> getAllTurnos() {
        List<Turno> turnos = turnoService.getAllTurnos();
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    // Obtener turno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Turno> getTurnoById(@PathVariable Long id) {
        Optional<Turno> turno = turnoService.findById(id);
        return turno.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar un turno por ID
    @PutMapping("/{id}")
    public ResponseEntity<Turno> updateTurno(@PathVariable Long id, @RequestBody Turno updatedTurno) {
        try {
            Turno turnoActualizado = turnoService.updateTurno(id, updatedTurno);
            return new ResponseEntity<>(turnoActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un turno por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
        Optional<Turno> turno = turnoService.findById(id);
        if (turno.isPresent()) {
            turnoService.deleteTurno(turno.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Obtener turnos de un barbero específico
    @GetMapping("/por-barbero/{barbero}")
    public ResponseEntity<List<Turno>> getTurnosByBarbero(@PathVariable String barbero) {
        List<Turno> turnos = turnoService.getTurnosByBarbero(barbero);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    // Obtener turnos de un local específico
    @GetMapping("/por-local/{local}")
    public ResponseEntity<List<Turno>> getTurnosByLocal(@PathVariable String local) {
        List<Turno> turnos = turnoService.getTurnosByLocal(local);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    // Obtener turnos de un cliente específico
    @GetMapping("/por-cliente/{cliente}")
    public ResponseEntity<List<Turno>> getTurnosByCliente(@PathVariable String cliente) {
        List<Turno> turnos = turnoService.getTurnosByCliente(cliente);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    // Filtrar turnos por fecha
    @GetMapping("/por-fecha")
    public ResponseEntity<?> getTurnosByFecha(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        if (fecha == null) {
            return new ResponseEntity<>("El parámetro 'fecha' es obligatorio (formato: YYYY-MM-DD)", HttpStatus.BAD_REQUEST);
        }
        List<Turno> turnos = turnoService.getTurnosByFecha(fecha);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    // Buscar turnos disponibles por fecha y opcionalmente barbero
    @GetMapping("/disponibles")
    public ResponseEntity<?> getTurnosDisponibles(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            @RequestParam(required = false) String barbero) {
        if (fecha == null) {
            return new ResponseEntity<>("El parámetro 'fecha' es obligatorio (formato: YYYY-MM-DD)", HttpStatus.BAD_REQUEST);
        }
        List<Turno> turnos = turnoService.getTurnosDisponibles(fecha, barbero);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }
}
