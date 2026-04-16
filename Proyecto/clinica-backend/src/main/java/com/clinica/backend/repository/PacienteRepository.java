package com.clinica.backend.repository;

import com.clinica.backend.model.Paciente;
import com.clinica.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByUsuario(Usuario usuario);

}