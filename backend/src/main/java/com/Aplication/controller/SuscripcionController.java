package com.Aplication.controller;

import com.Aplication.modelo.Licencia;
import com.Aplication.modelo.SuscripcionCliente;
import com.Aplication.service.SuscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
