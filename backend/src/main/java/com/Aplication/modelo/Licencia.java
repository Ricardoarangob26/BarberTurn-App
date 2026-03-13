package com.Aplication.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Licencia_Premium")
public class Licencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable = false)
    private String nombre; // Ej: "SILVER", "GOLD", "BLACK"

    private String descripcion;
    
    @Column(nullable = false)
    private Double precioMensual;
    
    @Column(columnDefinition = "boolean default true")
    private Boolean activa;
}
