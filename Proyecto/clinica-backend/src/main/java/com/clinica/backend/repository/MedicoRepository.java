package com.clinica.backend.repository;

import com.clinica.backend.model.Medico;
import com.clinica.backend.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    // Obtener todos los médicos activos
    List<Medico> findByActivoTrue();

    // Obtener médicos por especialidad
    List<Medico> findByEspecialidadAndActivoTrue(Especialidad especialidad);
}