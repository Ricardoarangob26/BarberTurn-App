package com.Aplication.modelodto;

import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorarioAtencionDTO {
    private Long id;
    private Long idlocal;
    private String diaSemana;
    private Boolean abierto;
    private LocalTime apertura;
    private LocalTime cierre;
}
