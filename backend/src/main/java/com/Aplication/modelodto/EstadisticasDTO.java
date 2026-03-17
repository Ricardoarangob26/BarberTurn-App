package com.Aplication.modelodto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstadisticasDTO {

    private Long barberiaId;
    private String nombre;
    private Long totalBarberos;
    private Long barberosActivos;
    private Long totalServicios;
    private Long citasEsteMes;
    private Long citasCanceladas;
    private Double tasaCancelacion;
    private Double calificacionPromedio;
    private Double ingresosEstimados;
}
