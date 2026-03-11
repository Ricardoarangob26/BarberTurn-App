package com.Aplication.controller;

import com.Aplication.Services.LocalService;
import com.Aplication.modelo.Local;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/local")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class LocalController {

    @Autowired

    private final LocalService LocalService;

    public LocalController(LocalService localService) {
        this.LocalService = localService;
    }

    // Crear o actualizar un Local
    @PostMapping("/post")
    public ResponseEntity<Local> createLocal(@RequestBody Local local) {
        Local nuevolocal = LocalService.create(local);
        return new ResponseEntity<>(nuevolocal, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<Local>> getAlllocal() {
        List<Local> Local = LocalService.getAllLocal();
        return new ResponseEntity<>(Local, HttpStatus.OK);
    }

    // Obtener Local por ID
    @GetMapping("/id")
    public ResponseEntity<Local> getEmpleadoById(@PathVariable Long id) {
        return LocalService.findById(id)
                .map(Local -> new ResponseEntity<>(Local, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar empleado por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> Deletelocal(@PathVariable Long id) {
        return LocalService.findById(id)
                .map(Local -> {
                    LocalService.deleteLocal(Local);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar un Local
    @PutMapping("/{id}")
    public ResponseEntity<Local> updateLocal(@PathVariable Long id, @RequestBody Local local) {
        return LocalService.findById(id)
                .map(existingLocal -> {
                    local.setIdlocal(existingLocal.getIdlocal());
                    Local updateLocal = LocalService.create(local);
                    return new ResponseEntity<>(updateLocal, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    //Cargar imagen
    @PutMapping("/imagen/{id}")
    public ResponseEntity<Local> updateClienteImage(
            @PathVariable Long id,
            @RequestPart("imagen") MultipartFile imagen) {
        try {
            Local local = LocalService.uploadImage(id, imagen);
            return new ResponseEntity<>(local, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    //Obtiene imagen
    @GetMapping("/imagen/{id}")
    public ResponseEntity<byte[]> getClienteImage(@PathVariable Long id) {
        try {
            byte[] imagen = LocalService.getImage(id); 
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) 
                    .body(imagen);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el cliente
        }
    }
}
