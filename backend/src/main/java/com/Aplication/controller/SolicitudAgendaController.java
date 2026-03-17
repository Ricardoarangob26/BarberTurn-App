package com.Aplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Aplication.Services.SolicitudAgendaService;
import com.Aplication.modelo.SolicitudAgenda;
import com.Aplication.modelodto.SolicitudAgendaDTO;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "http://localhost:5173")
public class SolicitudAgendaController {

    @Autowired
    private SolicitudAgendaService solicitudService;

    @GetMapping("/barbero/{idBarbero}")
    public ResponseEntity<List<SolicitudAgendaDTO>> getSolicitudesByBarbero(@PathVariable Long idBarbero) {
        return ResponseEntity.ok(solicitudService.findByBarbero(idBarbero));
    }

    @PostMapping
    public ResponseEntity<SolicitudAgenda> saveSolicitud(@RequestBody SolicitudAgenda solicitud) {
        return ResponseEntity.ok(solicitudService.save(solicitud));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolicitud(@PathVariable Long id) {
        solicitudService.delete(id);
        return ResponseEntity.ok().build();
    }
}
