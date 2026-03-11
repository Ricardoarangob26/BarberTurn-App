
package com.Aplication.Services;

import com.Aplication.modelo.Barbero;
import com.Aplication.modelo.Cliente;
import com.Aplication.repository.ClienteRepository;
import jakarta.mail.MessagingException;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

@Service

public class ClienteServices {
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private EmailService emailService;

    // Método para guardar un cliente
    @Transactional
    public Cliente create(Cliente cliente) throws MessagingException {
    // Verificar si ya existe un cliente con el mismo correo o teléfono
    if (clienteRepository.findByEmail(cliente.getEmail()).isPresent() || 
        clienteRepository.findByTelefono(cliente.getTelefono()).isPresent()) {
        throw new IllegalArgumentException("El correo electrónico o teléfono ya está registrado");
    }

    // Guardamos el cliente en la base de datos y lo devolvemos
    Cliente savedCliente = clienteRepository.save(cliente);

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
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Hola <strong>" + savedCliente.getNombre() + " " + savedCliente.getApellido() + "</strong>,</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Gracias por registrarte en BarberTurn. Estamos emocionados de tenerte como cliente y esperamos que disfrutes de nuestros servicios.</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;'>Si tienes alguna pregunta o necesitas asistencia para hacer una reserva, no dudes en contactarnos. Estamos aquí para ayudarte.</p>"
                + "<table cellpadding='0' cellspacing='0' border='0' width='100%'>"
                + "<tr>"
                + "<td align='center'>"
                + "<a href='https://barberturn.netlify.app/' style='display: inline-block; background-color: #FFD700; color: #333333; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 25px; font-size: 16px;'>Reserva tu turno ahora</a>"
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

        emailService.sendHtmlEmail(savedCliente.getEmail(),
                "Bienvenido a BarberTurn",
                htmlContent);

        return savedCliente;
    }

    // Lista
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public void delete(Cliente cliente) {
        clienteRepository.delete(cliente);
    }

    public Optional<Cliente> findBynombre(String nombre) {
        return clienteRepository.findBynombre(nombre);
    }
    
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente updateCliente(Long id, Cliente updatedCliente) {
        return clienteRepository.findById(id).map(cliente -> {
            if (updatedCliente.getNombre() != null) {
                cliente.setNombre(updatedCliente.getNombre());
            }
            if (updatedCliente.getApellido() != null) {
                cliente.setApellido(updatedCliente.getApellido());
            }
            if (updatedCliente.getTelefono() != null) {
                cliente.setTelefono(updatedCliente.getTelefono());
            }
            if (updatedCliente.getEmail() != null) {
                cliente.setEmail(updatedCliente.getEmail());
            }
            if (updatedCliente.getDireccion() != null) {
                cliente.setDireccion(updatedCliente.getDireccion());
            }
            if (updatedCliente.getRol() != null) {
                cliente.setRol(updatedCliente.getRol());
            }

            // Solo actualiza la imagen si se ha enviado una nueva
            if (updatedCliente.getImagen() != null) {
                cliente.setImagen(updatedCliente.getImagen());
            } else {
                // Mantiene la imagen actual si no se ha enviado una nueva
                updatedCliente.setImagen(cliente.getImagen());
            }

            // Guarda el cliente actualizado
            return clienteRepository.save(cliente);
        }).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    
    public Cliente uploadImage(Long Id, MultipartFile imagen) throws IOException {
        // Encontrar al cliente por su ID
        Optional<Cliente> clienteOptional = clienteRepository.findById(Id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            cliente.setImagen(imagen.getBytes()); // Establecer la imagen
            return clienteRepository.save(cliente); // Guardar el cliente actualizado
        } else {
            throw new RuntimeException("Cliente no encontrado");
        }
    }

    
    public byte[] getImage(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return cliente.getImagen(); 
    }




}
