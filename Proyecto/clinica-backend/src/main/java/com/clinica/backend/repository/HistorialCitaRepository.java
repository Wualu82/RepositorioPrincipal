package com.clinica.backend.repository;

import com.clinica.backend.model.HistorialCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialCitaRepository extends JpaRepository<HistorialCita, Long> {

    // Obtener historial de una cita específica
    List<HistorialCita> findByCitaId(Long citaId);
}