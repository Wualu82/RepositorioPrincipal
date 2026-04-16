package com.clinica.backend.controller;

import com.clinica.backend.model.Paciente;
import com.clinica.backend.repository.PacienteRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin
public class PacienteController {

    private final PacienteRepository pacienteRepository;

    public PacienteController(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @GetMapping
    public List<Paciente> getPacientes() {
        return pacienteRepository.findAll();
    }
}