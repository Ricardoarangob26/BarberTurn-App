/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.controller;

import com.Aplication.Services.AdminServices;
import com.Aplication.modelo.Admin;
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
@RequestMapping("/api/adminbarberia")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class AdminController {
    @Autowired
    private AdminServices adminServices;

    @PostMapping("/post")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin nuevoAdmin = adminServices.create(admin);
        return new ResponseEntity<>(nuevoAdmin, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminServices.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminByNombre(@PathVariable Long id) {
        return adminServices.findById(id)
                .map(admin -> new ResponseEntity<>(admin, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        return adminServices.findById(id) // Buscar el administrador por nombre
                .map(admin -> {
                    adminServices.delete(admin); // Eliminar administrador si existe
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); // Respuesta 204 si se elimina correctamente
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Respuesta 404 si no se encuentra el administrador
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
        try {
            Admin adminActualizado = adminServices.updateAdmin(id, updatedAdmin);
            return new ResponseEntity<>(adminActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    //Agregar imagen
    @PutMapping("/imagen/{id}")
    public ResponseEntity<Admin> updateClienteImage(
            @PathVariable Long id,
            @RequestPart("imagen") MultipartFile imagen) {
        try {
            Admin admin = adminServices.uploadImage(id, imagen);
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/imagen/{id}")
    public ResponseEntity<byte[]> getAdminImage(@PathVariable Long id) {
        try {
            byte[] imagen = adminServices.getImage(id); // Obtiene la imagen
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // O el tipo de imagen que has almacenado
                    .body(imagen);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el admin
        }
    }
}

