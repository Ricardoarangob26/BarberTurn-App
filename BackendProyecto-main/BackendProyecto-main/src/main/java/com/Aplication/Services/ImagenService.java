/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.Services;

import com.Aplication.modelo.Imagen;
import com.Aplication.repository.ImagenRepository;
import java.io.IOException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author KEVIN-PC
 */
@Service
public class ImagenService {
    private final ImagenRepository imagenRepository;

    public ImagenService(ImagenRepository imagenRepository) {
        this.imagenRepository = imagenRepository;
    }

    public Imagen guardarImagen(MultipartFile file) throws IOException {
        Imagen imagen = new Imagen();
        imagen.setData(file.getBytes());
        imagen.setNombre(file.getOriginalFilename());
        imagen.setTipo(file.getContentType());
        return imagenRepository.save(imagen);
    }

    public Imagen obtenerImagenPorId(Long id) {
        return imagenRepository.findById(id).orElseThrow(() -> new RuntimeException("Imagen no encontrada"));
    }
    
    public Imagen obtenerImagenPorNombre(String nombre) {
        return imagenRepository.findByNombre(nombre)
                .orElseThrow(() -> new RuntimeException("Imagen con nombre " + nombre + " no encontrada"));
    }
}
