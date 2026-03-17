package com.Aplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Aplication.Services.HorarioAtencionService;
import com.Aplication.modelo.HorarioAtencion;
import com.Aplication.modelodto.HorarioAtencionDTO;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "http://localhost:5173")
public class HorarioAtencionController {

    @Autowired
    private HorarioAtencionService horarioService;

    @GetMapping("/local/{idlocal}")
    public ResponseEntity<List<HorarioAtencionDTO>> getHorariosByLocal(@PathVariable Long idlocal) {
        return ResponseEntity.ok(horarioService.findByLocal(idlocal));
    }

    @PostMapping
    public ResponseEntity<HorarioAtencion> saveHorario(@RequestBody HorarioAtencion horario) {
        return ResponseEntity.ok(horarioService.save(horario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        horarioService.delete(id);
        return ResponseEntity.ok().build();
    }
}
