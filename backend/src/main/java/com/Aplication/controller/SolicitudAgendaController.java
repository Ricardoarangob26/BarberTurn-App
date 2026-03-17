package com.Aplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Aplication.Services.SolicitudAgendaService;
import com.Aplication.modelo.SolicitudAgenda;
import com.Aplication.modelodto.SolicitudAgendaDTO;
import com.Aplication.modelodto.SolicitudRespuestaDTO;

import java.util.List;

@RestController
@RequestMapping("/api/solicitud-agenda")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://barberturn.netlify.app"})
public class SolicitudAgendaController {

    @Autowired
    private SolicitudAgendaService solicitudService;

    // POST /api/solicitud-agenda/crear - Crear solicitud (Barbero)
    @PostMapping("/crear")
    public ResponseEntity<?> crearSolicitud(@RequestBody SolicitudAgenda solicitud) {
        try {
            SolicitudAgendaDTO creada = solicitudService.crearSolicitud(solicitud);
            return ResponseEntity.status(HttpStatus.CREATED).body(creada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /api/solicitud-agenda/barbero/{barberoId} - Obtener solicitudes de un barbero
    @GetMapping("/barbero/{barberoId}")
    public ResponseEntity<List<SolicitudAgendaDTO>> getSolicitudesByBarbero(@PathVariable Long barberoId) {
        return ResponseEntity.ok(solicitudService.getSolicitudesPorBarbero(barberoId));
    }

    // GET /api/solicitud-agenda/admin/todas - Listar todas (ADMIN)
    @GetMapping("/admin/todas")
    public ResponseEntity<List<SolicitudAgendaDTO>> getAllSolicitudes() {
        return ResponseEntity.ok(solicitudService.getSolicitudesTodas());
    }

    // GET /api/solicitud-agenda/{id} - Obtener detalle de una solicitud
    @GetMapping("/{id}")
    public ResponseEntity<?> getSolicitudById(@PathVariable Long id) {
        return solicitudService.getSolicitudPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/solicitud-agenda/{id}/aprobar - Aprobar solicitud (ADMIN)
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<?> aprobarSolicitud(@PathVariable Long id,
            @RequestBody SolicitudRespuestaDTO respuesta) {
        try {
            SolicitudAgendaDTO aprobada = solicitudService.aprobarSolicitud(
                    id, respuesta.getComentario(), respuesta.getAdminId());
            return ResponseEntity.ok(aprobada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/solicitud-agenda/{id}/rechazar - Rechazar solicitud (ADMIN)
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<?> rechazarSolicitud(@PathVariable Long id,
            @RequestBody SolicitudRespuestaDTO respuesta) {
        try {
            SolicitudAgendaDTO rechazada = solicitudService.rechazarSolicitud(
                    id, respuesta.getComentario(), respuesta.getAdminId());
            return ResponseEntity.ok(rechazada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE /api/solicitud-agenda/{id} - Eliminar solicitud (solo si está pendiente)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSolicitud(@PathVariable Long id) {
        try {
            solicitudService.eliminarSolicitud(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /api/solicitud-agenda/filtro?estado=pendiente&tipo=vacaciones - Filtros (ADMIN)
    @GetMapping("/filtro")
    public ResponseEntity<List<SolicitudAgendaDTO>> filtrarSolicitudes(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String tipo) {
        return ResponseEntity.ok(solicitudService.getSolicitudesPorFiltro(estado, tipo));
    }
}
