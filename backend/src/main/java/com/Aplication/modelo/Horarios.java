package com.Aplication.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Horarios")
public class Horarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToOne(mappedBy = "horarios")
    @JsonIgnore
    @ToString.Exclude
    private Barberia barberia;
}
