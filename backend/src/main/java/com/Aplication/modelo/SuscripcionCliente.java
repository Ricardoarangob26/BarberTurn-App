package com.Aplication.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Suscripcion_Cliente")
public class SuscripcionCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private UserCliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "licencia_id", nullable = false)
    private Licencia licencia;

    @Column(nullable = false)
    private LocalDate fechaInicio;
    
    @Column(nullable = false)
    private LocalDate fechaFin;

    @Column(nullable = false)
    private String estado; // ACTIVA, VENCIDA, CANCELADA

    private String metodoPago;
}
