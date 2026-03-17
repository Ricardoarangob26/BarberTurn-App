package com.Aplication.modelodto;

import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorariosDTO {

    private Long id;

    private Boolean lunesAbierto;
    private LocalTime lunesApertura;
    private LocalTime lunesCierre;

    private Boolean martesAbierto;
    private LocalTime martesApertura;
    private LocalTime martesCierre;

    private Boolean miercolesAbierto;
    private LocalTime miercolesApertura;
    private LocalTime miercolesCierre;

    private Boolean juevesAbierto;
    private LocalTime juevesApertura;
    private LocalTime juevesCierre;

    private Boolean viernesAbierto;
    private LocalTime viernesApertura;
    private LocalTime viernesCierre;

    private Boolean sabadoAbierto;
    private LocalTime sabadoApertura;
    private LocalTime sabadoCierre;

    private Boolean domingoAbierto;
    private LocalTime domingoApertura;
    private LocalTime domingoCierre;
}
