package com.clinica.backend.repository;

import com.clinica.backend.model.HorarioMedico;
import com.clinica.backend.model.DiaSemana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorarioMedicoRepository extends JpaRepository<HorarioMedico, Long> {

    List<HorarioMedico> findByMedico_Id(Long medicoId);

    // 🔥 ESTE ES EL IMPORTANTE
    List<HorarioMedico> findByMedico_IdAndDiaSemana(Long medicoId, DiaSemana diaSemana);
}