package com.Aplication.modelo;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    // Duración en días (30 para mensual, 365 para anual)
    private Integer duracionDias;

    // Color asociado al plan: gris, oro, rojo
    private String color;

    // Nivel del plan: Silver, Gold, Black VIP
    private String nivel;

    // Beneficios del plan almacenados como lista
    @ElementCollection
    @CollectionTable(name = "Licencia_Beneficios", joinColumns = @JoinColumn(name = "licencia_id"))
    @Column(name = "beneficio")
    private List<String> beneficios;
}
