package com.clinica.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="historial_citas")
public class HistorialCita {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="id_cita")
    private Cita cita;

    private String accion;
    private LocalDateTime fecha = LocalDateTime.now();

    // Getters y setters
}