/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.controller;

import com.Aplication.Services.ImagenService;
import com.Aplication.modelo.Imagen;
import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author KEVIN-PC
 */

@RestController
@RequestMapping("/api/foto")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class ImagenController {
    
    private final ImagenService imagenService;

    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @PostMapping("/post")
    public ResponseEntity<String> subirImagen(@RequestParam("file") MultipartFile file) throws java.io.IOException {
        try {
            Imagen imagen = imagenService.guardarImagen(file);
            return ResponseEntity.ok("Imagen guardada con éxito con ID: " + imagen.getId());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al guardar la imagen");
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<byte[]> obtenerImagen(@PathVariable Long id) {
        Imagen imagen = imagenService.obtenerImagenPorId(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(imagen.getTipo()))
                .body(imagen.getData());
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<byte[]> obtenerImagenPorNombre(@PathVariable String nombre) {
        Imagen imagen = imagenService.obtenerImagenPorNombre(nombre);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(imagen.getTipo()))
                .body(imagen.getData());
    }
}
    
    

