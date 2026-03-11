/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Aplication.Services;

import com.Aplication.modelo.Barbero;
import com.Aplication.modelodto.BarberoDTO;
import com.Aplication.repository.BarberoRepository;
import jakarta.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author KEVIN-PC
 */
@Service
public class BarberoService {
    
    @Autowired
    private BarberoRepository barberoRepository;
    
    @Autowired
    private EmailService emailService;

    @Transactional
    public Barbero create(Barbero barbero) throws MessagingException {
        // Verificar si ya existe un barbero con el mismo correo o teléfono
        if (barberoRepository.findByEmail(barbero.getEmail()).isPresent() || 
            barberoRepository.findByTelefono(barbero.getTelefono()).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico o teléfono ya está registrado");
        }

    // Guardamos el barbero en la base de datos y lo devolvemos
        Barbero savedBarbero = barberoRepository.save(barbero);

        // Creamos el contenido HTML del correo de bienvenida con estilos en línea
        String htmlContent
                = "<html>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "</head>"
                + "<body style='font-family: Helvetica Neue, Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;'>"
                + "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='background-color: #f6f6f6; padding: 20px;'>"
                + "<tr>"
                + "<td align='center'>"
                + "<table cellpadding='0' cellspacing='0' border='0' width='600' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>"
                + "<tr>"
                + "<td style='padding: 40px 0; text-align: center; background-color: #FFD700;'>"
                + "<h1 style='color: #333333; font-size: 28px; margin: 0;'>¡Bienvenido a BarberTurn!</h1>"
                + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td style='padding: 40px 30px;'>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Hola <strong>" + savedBarbero.getNombre() + " " + savedBarbero.getApellido() + "</strong>,</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Bienvenido al equipo de BarberTurn. Estamos emocionados de tenerte con nosotros y esperamos que tu experiencia sea excepcional.</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;'>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte en cada paso del camino.</p>"
                + "<table cellpadding='0' cellspacing='0' border='0' width='100%'>"
                + "<tr>"
                + "<td align='center'>"
                + "<a href='https://barberturn.netlify.app/' style='display: inline-block; background-color: #FFD700; color: #333333; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 25px; font-size: 16px;'>Comienza Ahora</a>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td style='background-color: #333333; padding: 30px; text-align: center;'>"
                + "<p style='color: #ffffff; font-size: 14px; margin: 0 0 10px 0;'>¡Saludos!</p>"
                + "<p style='color: #ffffff; font-size: 14px; margin: 0;'>El equipo de BarberTurn</p>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</body>"
                + "</html>";

        // Enviamos el correo de bienvenida en formato HTML
        emailService.sendHtmlEmail(savedBarbero.getEmail(),
                "Bienvenido a BarberTurn",
                htmlContent);

        return savedBarbero;
    }
    

    // Método para obtener todos los barberos
    public List<Barbero> getAllBarberos() {
        return barberoRepository.findAll();
    }

    // Método para eliminar un barbero
    public void delete(Barbero barbero) {
        barberoRepository.delete(barbero);
    }

    // Método para encontrar barbero por nombre
    public Optional<Barbero> findByNombre(String nombre) {
        return barberoRepository.findByNombre(nombre);
    }
    
    public Optional<Barbero> findById(Long id) {
        return barberoRepository.findById(id);
    }
    
    

    // Método para actualizar un barbero
    public Barbero updateBarbero(Long id, Barbero updatedBarbero) {
        return barberoRepository.findById(id).map(barbero -> {
            if (updatedBarbero.getNombre() != null) {
                barbero.setNombre(updatedBarbero.getNombre());
            }
            if (updatedBarbero.getApellido() != null) {
                barbero.setApellido(updatedBarbero.getApellido());
            }
            if (updatedBarbero.getTelefono() != null) {
                barbero.setTelefono(updatedBarbero.getTelefono());
            }
            if (updatedBarbero.getEmail() != null) {
                barbero.setEmail(updatedBarbero.getEmail());
            }
            if (updatedBarbero.getLocal() != null) {
                barbero.setLocal(updatedBarbero.getLocal());
            }
            if (updatedBarbero.getRol() != null) {
                barbero.setRol(updatedBarbero.getRol());
            }

            // Solo actualiza la imagen si se ha enviado una nueva
            if (updatedBarbero.getImagen() != null) {
                barbero.setImagen(updatedBarbero.getImagen());
            } else {
                // Mantiene la imagen actual si no se ha enviado una nueva
                updatedBarbero.setImagen(barbero.getImagen());
            }

            // Guarda el barbero actualizado
            return barberoRepository.save(barbero);
        }).orElseThrow(() -> new RuntimeException("Barbero no encontrado"));
    }

    
    public Barbero uploadImage(Long Id, MultipartFile imagen) throws IOException {
        // Encontrar al cliente por su ID
        Optional<Barbero> barberoOptional = barberoRepository.findById(Id);

        if (barberoOptional.isPresent()) {
            Barbero barbero = barberoOptional.get();
            barbero.setImagen(imagen.getBytes()); // Establecer la imagen
            return barberoRepository.save(barbero); // Guardar el cliente actualizado
        } else {
            throw new RuntimeException("barbero no encontrado");
        }
    }
    
    public byte[] getImage(Long id) {
        Barbero barbero = barberoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbero no encontrado"));
        return barbero.getImagen(); // Devuelve la imagen almacenada como byte[]
    }

}
