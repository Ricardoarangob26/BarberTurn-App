package com.Aplication.modelodto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudAgendaFilterDTO {
    private String estado;
    private String tipo;
    private Long barberoId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
