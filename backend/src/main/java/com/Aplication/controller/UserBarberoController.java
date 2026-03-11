/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.controller;

import com.Aplication.Services.UserBarberoService;
import com.Aplication.modelo.UserBarbero;
import com.Aplication.modelo.UserCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author KEVIN-PC
 */

@RestController
@RequestMapping("/api/user/barbero")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class UserBarberoController {
    
    @Autowired
    private UserBarberoService userService;

    //@Autowired
    //private PasswordEncoder passwordEncoder;
    @PostMapping("/post")
    public ResponseEntity<?> create(@RequestBody UserBarbero user) {
        try {
            UserBarbero nuevoUser = userService.create(user);
            return new ResponseEntity<>(nuevoUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserBarbero>> getAllUser() {
        List<UserBarbero> user = userService.getAllUser();
        return new ResponseEntity<>(user, HttpStatus.OK);
 
    }
    
    // Endpoint para actualizar un barbero
    @PutMapping("/{id}")
    public ResponseEntity<UserBarbero> updateBarbero(@PathVariable Long id, @RequestBody UserBarbero updatedUser) {
        try {
            // Establece el ID del barbero que se quiere actualizar
            updatedUser.setId(id);

            // Busca el barbero existente
            Optional<UserBarbero> existingUserOpt = userService.findById(id);
            if (!existingUserOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            UserBarbero existingUser = existingUserOpt.get();

            // Actualiza solo los campos proporcionados
            if (updatedUser.getUsername() != null) {
                existingUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getPassword() != null) {
                existingUser.setPassword(updatedUser.getPassword());
            }

            // Guarda el barbero actualizado
            userService.update(existingUser);

            return ResponseEntity.ok(existingUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
}
