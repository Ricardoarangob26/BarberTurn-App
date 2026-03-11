/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.Services;

import com.Aplication.modelo.UserBarbero;
import com.Aplication.repository.UserBarberoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author KEVIN-PC
 */
@Service
public class UserBarberoService {
    
    @Autowired
    private UserBarberoRepository userBarberoRepository;
    
    @Autowired
    private UserClienteService userClienteService;
    
    // Método para guardar un barbero
    @Transactional
    public UserBarbero create(UserBarbero user) {
        // Verificamos que el usuario no exista en ninguna de las dos tablas
        if (userBarberoRepository.findByUsername(user.getUsername()).isPresent() ||
            userClienteService.findBynombre(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("El usuario ya existe en otra tabla");
        }
        // Guardamos el barbero en la base de datos y lo devolvemos
        return userBarberoRepository.save(user);
    }

    // Lista
    public List<UserBarbero> getAllUser() {
        return userBarberoRepository.findAll();
    }

    public void delete(UserBarbero user) {
        userBarberoRepository.delete(user);
    }

    public Optional<UserBarbero> findBynombre(String nombre) {
        return userBarberoRepository.findByUsername(nombre);
    }
    
        public Optional<UserBarbero> findById(Long id) {
        return userBarberoRepository.findById(id);
    }
    
    
    // Método para actualizar un barbero
    public UserBarbero update(UserBarbero updatedUser) {
        return userBarberoRepository.findById(updatedUser.getId()).map(user -> {
            // Actualiza los campos necesarios
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            // Guarda el barbero actualizado y lo devuelve
            return userBarberoRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("El barbero no existe en la base de datos"));
    }


}
