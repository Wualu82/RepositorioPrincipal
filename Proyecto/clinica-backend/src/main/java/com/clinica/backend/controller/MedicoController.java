package com.clinica.backend.controller;

import com.clinica.backend.model.Medico;
import com.clinica.backend.repository.MedicoRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
@CrossOrigin
public class MedicoController {

    private final MedicoRepository medicoRepository;

    public MedicoController(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @GetMapping
    public List<Medico> obtenerTodos() {
        return medicoRepository.findAll();
    }

    // 🔥 AÑADIR ESTO
    @GetMapping("/{id}")
    public Medico obtenerPorId(@PathVariable Long id) {
        return medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medico no encontrado"));
    }
}