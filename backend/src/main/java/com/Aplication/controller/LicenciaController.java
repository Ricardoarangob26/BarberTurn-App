package com.Aplication.controller;

import com.Aplication.modelo.Licencia;
import com.Aplication.service.LicenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licencias")
@CrossOrigin(origins = "http://localhost:3000")
public class LicenciaController {

    @Autowired
    private LicenciaService licenciaService;

    @GetMapping
    public ResponseEntity<List<Licencia>> getAllLicencias() {
        return ResponseEntity.ok(licenciaService.getAllLicencias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLicenciaById(@PathVariable Long id) {
        return licenciaService.getLicenciaById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearLicencia(@RequestBody Licencia licencia) {
        try {
            return ResponseEntity.ok(licenciaService.crearLicencia(licencia));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarLicencia(@PathVariable Long id, @RequestBody Licencia licencia) {
        try {
            return ResponseEntity.ok(licenciaService.actualizarLicencia(id, licencia));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarLicencia(@PathVariable Long id) {
        try {
            licenciaService.eliminarLicencia(id);
            return ResponseEntity.ok("Licencia eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
