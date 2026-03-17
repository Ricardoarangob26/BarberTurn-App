package com.Aplication.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Barberia")
public class Barberia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String slogan;
    private String descripcion;
    private String direccion;
    private String ciudad;
    private String telefono;
    private String email;
    private String sitioWeb;
    private String instagram;
    private String facebook;

    @Lob
    @JsonIgnore
    private byte[] logo;

    @Lob
    @JsonIgnore
    private byte[] fotoPrincipal;

    @OneToMany(mappedBy = "barberia", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Barbero> barberos;

    @OneToMany(mappedBy = "barberia", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Servicio> servicios;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "horarios_id")
    private Horarios horarios;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}
