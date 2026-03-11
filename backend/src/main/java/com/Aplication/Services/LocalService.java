package com.Aplication.Services;

import com.Aplication.modelo.Local;
import com.Aplication.repository.LocalRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository; 

    // Crear o actualizar un Local
    public Local create(Local local) {
        return localRepository.save(local);
    }

    // Obtener todos los Locales
    public List<Local> getAllLocal() {
        return localRepository.findAll();
    }

    // Obtener Local por ID
    public Optional<Local> findById(Long id) {
        return localRepository.findById(id);
    }


    // Eliminar un Local por su ID
    public void deleteLocal(Local local) {
        localRepository.delete(local);
    }

    public Local updateLocal(Long id, Local updateLocal) {
        return localRepository.findById(id).map(local -> {
            if (updateLocal.getLocal() != null) {
                local.setLocal(updateLocal.getLocal());
            }
            if (updateLocal.getTelefono() != null) {
                local.setTelefono(updateLocal.getTelefono());
            }
            if (updateLocal.getDireccion() != null) {
                local.setDireccion(updateLocal.getDireccion());
            }

            // Solo actualiza la imagen si se ha enviado una nueva
            if (updateLocal.getImagen() != null) {
                local.setImagen(updateLocal.getImagen());
            } else {
                // Mantiene la imagen actual si no se ha enviado una nueva
                updateLocal.setImagen(local.getImagen());
            }

            // Guarda el local actualizado
            return localRepository.save(local);
        }).orElseThrow(() -> new RuntimeException("Local no encontrado"));
    }
    
    public Local uploadImage(Long Id, MultipartFile imagen) throws IOException {
        // Encontrar al cliente por su ID
        Optional<Local> localOptional = localRepository.findById(Id);

        if (localOptional.isPresent()) {
            Local local = localOptional.get();
            local.setImagen(imagen.getBytes()); // Establecer la imagen
            return localRepository.save(local); // Guardar el cliente actualizado
        } else {
            throw new RuntimeException("Local no encontrado");
        }
    }

    
    public byte[] getImage(Long id) {
        Local local = localRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Local no encontrado"));
        return local.getImagen(); 
    }
}