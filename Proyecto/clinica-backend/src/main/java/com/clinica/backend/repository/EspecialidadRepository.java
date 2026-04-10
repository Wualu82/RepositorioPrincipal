package com.clinica.backend.repository;

import com.clinica.backend.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {

    // Obtener solo especialidades activas
    List<Especialidad> findByActivoTrue();

    // Buscar por nombre
    List<Especialidad> findByNombreContainingIgnoreCase(String nombre);
}