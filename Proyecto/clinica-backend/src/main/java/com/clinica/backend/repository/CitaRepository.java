package com.clinica.backend.repository;

import com.clinica.backend.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    boolean existsByMedico_IdAndFecha(Long medicoId, LocalDateTime fecha);

    // 🔥 NUEVO
    List<Cita> findByPaciente_Id(Long pacienteId);
}