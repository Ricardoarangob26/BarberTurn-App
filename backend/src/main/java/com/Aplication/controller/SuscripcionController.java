package com.Aplication.controller;

import com.Aplication.modelo.Licencia;
import com.Aplication.modelo.SuscripcionCliente;
import com.Aplication.modelodto.SuscripcionDTO;
import com.Aplication.service.SuscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suscripciones")
@CrossOrigin(origins = "http://localhost:3000")
public class SuscripcionController {

    @Autowired
    private SuscripcionService suscripcionService;

    @GetMapping("/licencias")
    public ResponseEntity<List<Licencia>> getLicencias() {
        return ResponseEntity.ok(suscripcionService.getAllLicenciasActivas());
    }

    @PostMapping("/comprar")
    public ResponseEntity<?> comprarSuscripcion(@RequestParam Long licenciaId, @RequestParam String metodoPago) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Extraído del JWT
        
        try {
            SuscripcionCliente suscripcion = suscripcionService.adquirirSuscripcion(username, licenciaId, metodoPago);
            return ResponseEntity.ok(suscripcion);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/mi-estado")
    public ResponseEntity<?> miEstado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        try {
            return suscripcionService.getSuscripcionActiva(username)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.noContent().build());
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Endpoints de administración ---

    @GetMapping("/admin/todas")
    public ResponseEntity<List<SuscripcionDTO>> getAllSuscripciones() {
        return ResponseEntity.ok(suscripcionService.getAllSuscripciones());
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarSuscripcion(@PathVariable Long id) {
        try {
            SuscripcionDTO cancelada = suscripcionService.cancelarSuscripcion(id);
            return ResponseEntity.ok(cancelada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getSuscripcionPorUsuario(@PathVariable Long userId) {
        try {
            List<SuscripcionDTO> suscripciones = suscripcionService.getSuscripcionesPorUsuario(userId);
            return ResponseEntity.ok(suscripciones);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/activas/count")
    public ResponseEntity<Map<String, Long>> contarSuscripcionesActivas() {
        long count = suscripcionService.getSuscripcionesActivasCount();
        return ResponseEntity.ok(Map.of("total", count));
    }
}
