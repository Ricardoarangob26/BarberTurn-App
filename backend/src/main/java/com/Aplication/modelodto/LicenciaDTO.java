package com.Aplication.modelodto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenciaDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private Double precioMensual;
    private Boolean activa;
    private Integer duracionDias;
    private String color;
    private String nivel;
    private List<String> beneficios;
}
