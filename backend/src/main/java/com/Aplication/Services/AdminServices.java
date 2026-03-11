/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.Services;

import com.Aplication.modelo.Admin;
import com.Aplication.repository.AdminRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author KEVIN-PC
 */
@Service
public class AdminServices {
    @Autowired
    private AdminRepository adminRepository;

    // Método para guardar un administrador
    public Admin create(Admin admin) {
        // Guardamos el administrador en la base de datos y lo devolvemos
        return adminRepository.save(admin);
    }

    // Método para obtener todos los administradores
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Método para eliminar un administrador
    public void delete(Admin admin) {
        adminRepository.delete(admin);
    }

    
    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }
    


    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            if (updatedAdmin.getNombre() != null) {
                admin.setNombre(updatedAdmin.getNombre());
            }
            if (updatedAdmin.getApellido() != null) {
                admin.setApellido(updatedAdmin.getApellido());
            }
            if (updatedAdmin.getTelefono() != null) {
                admin.setTelefono(updatedAdmin.getTelefono());
            }
            if (updatedAdmin.getCorreo() != null) {
                admin.setCorreo(updatedAdmin.getCorreo());
            }
            if (updatedAdmin.getRol() != null) {
                admin.setRol(updatedAdmin.getRol());
            }
            if (updatedAdmin.getLocal() != null) {
                admin.setLocal(updatedAdmin.getLocal());
            }
            if (updatedAdmin.getDireccion() != null) {
                admin.setDireccion(updatedAdmin.getDireccion());
            }
            if (updatedAdmin.getContrasena() != null) {
                admin.setContrasena(updatedAdmin.getContrasena());
            }

            // Solo actualiza la imagen si se ha enviado una nueva
            if (updatedAdmin.getImagen() != null) {
                admin.setImagen(updatedAdmin.getImagen());
            } else {
                // Mantiene la imagen actual si no se ha enviado una nueva
                updatedAdmin.setImagen(admin.getImagen());
            }

            // Guarda el admin actualizado
            return adminRepository.save(admin);
        }).orElseThrow(() -> new RuntimeException("Admin no encontrado"));
    }


    
    public Admin uploadImage(Long id, MultipartFile imagen) throws IOException {
        // Encontrar al administrador por su ID
        Optional<Admin> adminOptional = adminRepository.findById(id);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setImagen(imagen.getBytes()); // Establecer la imagen
            return adminRepository.save(admin); // Guardar el administrador actualizado
        } else {
            throw new RuntimeException("Administrador no encontrado");
        }
    }
    
    public byte[] getImage(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        return admin.getImagen(); // Devuelve la imagen almacenada como byte[]
    }

}
