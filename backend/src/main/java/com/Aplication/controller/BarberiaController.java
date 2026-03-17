package com.Aplication.controller;

import com.Aplication.Services.BarberiaService;
import com.Aplication.modelo.Barberia;
import com.Aplication.modelo.Barbero;
import com.Aplication.modelo.Horarios;
import com.Aplication.modelo.Servicio;
import com.Aplication.modelodto.BarberiaDTO;
import com.Aplication.modelodto.EstadisticasDTO;
import com.Aplication.modelodto.HorariosDTO;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/barberia")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://barberturn.netlify.app"})
public class BarberiaController {

    @Autowired
    private BarberiaService barberiaService;

    // ── CRUD Barbería ────────────────────────────────────────────────────────

    @PostMapping("/crear")
    public ResponseEntity<BarberiaDTO> crear(@RequestBody Barberia barberia) {
        try {
            Barberia nueva = barberiaService.crear(barberia);
            return new ResponseEntity<>(barberiaService.toDTO(nueva), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BarberiaDTO> getById(@PathVariable Long id) {
        return barberiaService.findById(id)
                .map(b -> new ResponseEntity<>(barberiaService.toDTO(b), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BarberiaDTO> actualizar(@PathVariable Long id, @RequestBody Barberia datos) {
        try {
            Barberia actualizada = barberiaService.actualizar(id, datos);
            return new ResponseEntity<>(barberiaService.toDTO(actualizada), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            barberiaService.eliminar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<BarberiaDTO> getByNombre(@PathVariable String nombre) {
        return barberiaService.findByNombre(nombre)
                .map(b -> new ResponseEntity<>(barberiaService.toDTO(b), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<List<BarberiaDTO>> getByCiudad(@PathVariable String ciudad) {
        List<BarberiaDTO> lista = barberiaService.findByCiudad(ciudad).stream()
                .map(barberiaService::toDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BarberiaDTO>> getAll() {
        List<BarberiaDTO> lista = barberiaService.findAll().stream()
                .map(barberiaService::toDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // ── Horarios ─────────────────────────────────────────────────────────────

    @PostMapping("/{id}/horarios")
    public ResponseEntity<HorariosDTO> crearHorarios(@PathVariable Long id, @RequestBody Horarios horarios) {
        try {
            Barberia barberia = barberiaService.guardarHorarios(id, horarios);
            if (barberia.getHorarios() == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(barberiaService.toHorariosDTO(barberia.getHorarios()), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/horarios")
    public ResponseEntity<HorariosDTO> getHorarios(@PathVariable Long id) {
        return barberiaService.obtenerHorarios(id)
                .map(h -> new ResponseEntity<>(barberiaService.toHorariosDTO(h), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}/horarios")
    public ResponseEntity<HorariosDTO> actualizarHorarios(@PathVariable Long id, @RequestBody Horarios horarios) {
        try {
            Barberia barberia = barberiaService.guardarHorarios(id, horarios);
            if (barberia.getHorarios() == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(barberiaService.toHorariosDTO(barberia.getHorarios()), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ── Gestión de Barberos ───────────────────────────────────────────────────

    @PostMapping("/{id}/agregar-barbero")
    public ResponseEntity<Barbero> agregarBarbero(@PathVariable Long id, @RequestBody Long barberoId) {
        try {
            Barbero barbero = barberiaService.agregarBarbero(id, barberoId);
            return new ResponseEntity<>(barbero, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}/barbero/{barberoId}")
    public ResponseEntity<Void> removerBarbero(@PathVariable Long id, @PathVariable Long barberoId) {
        try {
            barberiaService.removerBarbero(id, barberoId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/barberos")
    public ResponseEntity<List<Barbero>> listarBarberos(@PathVariable Long id) {
        try {
            List<Barbero> barberos = barberiaService.listarBarberos(id);
            return new ResponseEntity<>(barberos, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ── Gestión de Servicios ──────────────────────────────────────────────────

    @PostMapping("/{id}/servicios")
    public ResponseEntity<Servicio> agregarServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        try {
            Servicio nuevo = barberiaService.agregarServicio(id, servicio);
            return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/servicios/{servId}")
    public ResponseEntity<Servicio> actualizarServicio(
            @PathVariable Long id,
            @PathVariable int servId,
            @RequestBody Servicio servicio) {
        try {
            Servicio actualizado = barberiaService.actualizarServicio(id, servId, servicio);
            return new ResponseEntity<>(actualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}/servicios/{servId}")
    public ResponseEntity<Void> eliminarServicio(@PathVariable Long id, @PathVariable int servId) {
        try {
            barberiaService.eliminarServicio(id, servId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/servicios")
    public ResponseEntity<List<Servicio>> listarServicios(@PathVariable Long id) {
        try {
            List<Servicio> servicios = barberiaService.listarServicios(id);
            return new ResponseEntity<>(servicios, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ── Estadísticas ──────────────────────────────────────────────────────────

    @GetMapping("/{id}/estadisticas")
    public ResponseEntity<EstadisticasDTO> getEstadisticas(@PathVariable Long id) {
        try {
            EstadisticasDTO estadisticas = barberiaService.obtenerEstadisticas(id);
            return new ResponseEntity<>(estadisticas, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ── Imágenes ──────────────────────────────────────────────────────────────

    @PutMapping("/{id}/logo")
    public ResponseEntity<BarberiaDTO> subirLogo(
            @PathVariable Long id,
            @RequestPart("logo") MultipartFile archivo) {
        try {
            Barberia barberia = barberiaService.subirLogo(id, archivo);
            return new ResponseEntity<>(barberiaService.toDTO(barberia), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/logo")
    public ResponseEntity<byte[]> getLogo(@PathVariable Long id) {
        try {
            byte[] logo = barberiaService.obtenerLogo(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(logo);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/foto-principal")
    public ResponseEntity<BarberiaDTO> subirFotoPrincipal(
            @PathVariable Long id,
            @RequestPart("foto") MultipartFile archivo) {
        try {
            Barberia barberia = barberiaService.subirFotoPrincipal(id, archivo);
            return new ResponseEntity<>(barberiaService.toDTO(barberia), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/foto-principal")
    public ResponseEntity<byte[]> getFotoPrincipal(@PathVariable Long id) {
        try {
            byte[] foto = barberiaService.obtenerFotoPrincipal(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(foto);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
