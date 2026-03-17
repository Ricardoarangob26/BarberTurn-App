package com.Aplication.modelodto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudAgendaDTO {
    private Long id;
    private Long barberoId;
    private String barberoNombre;
    private String tipo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String motivo;
    private String estado;
    private LocalDate fechaSolicitud;
}
