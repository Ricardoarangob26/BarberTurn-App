package com.Aplication.modelodto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BarberiaDTO {

    private Long id;
    private String nombre;
    private String slogan;
    private String descripcion;
    private String direccion;
    private String ciudad;
    private String telefono;
    private String email;
    private String sitioWeb;
    private String instagram;
    private String facebook;
    private boolean tieneLogo;
    private boolean tieneFotoPrincipal;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}
