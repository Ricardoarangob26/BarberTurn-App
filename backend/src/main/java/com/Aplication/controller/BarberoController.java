/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.controller;

import com.Aplication.Services.BarberoService;
import com.Aplication.modelo.Barbero;
import com.Aplication.modelodto.BarberoDTO;
import jakarta.mail.MessagingException;
import java.io.IOException;
import java.util.List;
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

/**
 *
 * @author KEVIN-PC
 */

@RestController
@RequestMapping("/api/barberos")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class BarberoController {
    
    @Autowired
    private BarberoService barberoService;

    @PostMapping("/post")
    public ResponseEntity<Barbero> createBarbero(@RequestBody Barbero barbero) {
        try {
            // Intenta crear el barbero con la validación de correo y teléfono
            Barbero nuevoBarbero = barberoService.create(barbero);
            return new ResponseEntity<>(nuevoBarbero, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Si el correo o teléfono ya existe, devolver un 400 con el mensaje específico
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Para cualquier otro error general
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<List<Barbero>> getAllBarberos() {
        List<Barbero> barberos = barberoService.getAllBarberos();
        return new ResponseEntity<>(barberos, HttpStatus.OK);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<Barbero> getBarberoByNombre(@PathVariable String nombre) {
        return barberoService.findByNombre(nombre)
                .map(barbero -> new ResponseEntity<>(barbero, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarbero(@PathVariable Long id) {
        return barberoService.findById(id) // Buscar el barbero por id
                .map(barbero -> {
                    barberoService.delete(barbero); // Eliminar barbero si existe
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); // Respuesta 204 si se elimina correctamente
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Respuesta 404 si no se encuentra el barbero
    }


    @PutMapping("/{id}")
    public ResponseEntity<Barbero> updateBarbero(@PathVariable Long id, @RequestBody Barbero updatedBarbero) {
        try {
            Barbero barbero = barberoService.updateBarbero(id, updatedBarbero);
            return new ResponseEntity<>(barbero, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    //Agregar imagen
    @PutMapping("/imagen/{id}")
    public ResponseEntity<Barbero> updateClienteImage(
            @PathVariable Long id,
            @RequestPart("imagen") MultipartFile imagen) {
        try {
            Barbero barbero = barberoService.uploadImage(id, imagen);
            return new ResponseEntity<>(barbero, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //Obtiene imagen
    @GetMapping("/imagen/{id}")
    public ResponseEntity<byte[]> getBarberoImage(@PathVariable Long id) {
        try {
            byte[] imagen = barberoService.getImage(id); 
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) 
                    .body(imagen);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }

}
