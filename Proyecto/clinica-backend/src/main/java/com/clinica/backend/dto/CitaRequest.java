package com.clinica.backend.dto;

import java.time.LocalDateTime;

public class CitaRequest {

    private Long medicoId;
    private Long pacienteId; // 🔥 IMPORTANTE para ADMIN
    private LocalDateTime fecha;

    public CitaRequest() {}

    public Long getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(Long medicoId) {
        this.medicoId = medicoId;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}