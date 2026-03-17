package com.Aplication.modelodto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuscripcionDTO {

    private Long id;
    private Long clienteId;
    private String clienteUsername;
    private Long licenciaId;
    private String licenciaNombre;
    private String licenciaNivel;
    private Double licenciaPrecioMensual;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    private String metodoPago;
}
