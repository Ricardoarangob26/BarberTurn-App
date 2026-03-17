package com.Aplication.modelodto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudRespuestaDTO {
    private String comentario;
    private Long adminId;
}
