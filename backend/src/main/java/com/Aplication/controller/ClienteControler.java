
package com.Aplication.controller;


import com.Aplication.Services.ClienteServices;
import com.Aplication.modelo.Cliente;
import jakarta.mail.MessagingException;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/cliente")
@CrossOrigin(origins = {"http://localhost:3000", "https://barberturn.netlify.app"})
public class ClienteControler {

    @Autowired
    private ClienteServices clienteServices;

    @PostMapping("/post")
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        try {
            // Intenta crear el barbero con la validación de correo y teléfono
            Cliente nuevoCliente = clienteServices.create(cliente);
            return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Si el correo o teléfono ya existe, devolver un 400 con el mensaje específico
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Para cualquier otro error general
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        List<Cliente> clientes = clienteServices.getAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Cliente> getClienteById(@PathVariable String nombre) {
        return clienteServices.findBynombre(nombre)
                .map(cliente -> new ResponseEntity<>(cliente, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        return clienteServices.findById(id) // Buscar el cliente por nombre
                .map(cliente -> {
                    clienteServices.delete(cliente); // Eliminar cliente si existe
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); // Respuesta 204 si se elimina correctamente
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Respuesta 404 si no se encuentra el cliente
    }


    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente updatedCliente) {
        try {
            Cliente clienteActualizado = clienteServices.updateCliente(id, updatedCliente);
            return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    //Cargar imagen
    @PutMapping("/imagen/{id}")
    public ResponseEntity<Cliente> updateClienteImage(
            @PathVariable Long id,
            @RequestPart("imagen") MultipartFile imagen) {
        try {
            Cliente cliente = clienteServices.uploadImage(id, imagen);
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    //Obtiene imagen
    @GetMapping("/imagen/{id}")
    public ResponseEntity<byte[]> getClienteImage(@PathVariable Long id) {
        try {
            byte[] imagen = clienteServices.getImage(id); 
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) 
                    .body(imagen);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el cliente
        }
    }


}

