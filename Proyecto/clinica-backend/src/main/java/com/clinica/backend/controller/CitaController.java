package com.clinica.backend.controller;

import com.clinica.backend.model.Cita;
import com.clinica.backend.model.EstadoCita;
import com.clinica.backend.service.CitaService;
import com.clinica.backend.repository.CitaRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/citas")
public class CitaController {

    private final CitaService citaService;
    private final CitaRepository citaRepository;

    public CitaController(CitaService citaService, CitaRepository citaRepository) {
        this.citaService = citaService;
        this.citaRepository = citaRepository;
    }

    // 👑 ADMIN → ver todas
    @GetMapping
    public List<Cita> obtenerTodas() {
        return citaService.obtenerTodas();
    }

    // 👤 MIS CITAS
    @GetMapping("/mis-citas")
    public List<Cita> obtenerMisCitas() {
        return citaService.obtenerCitasDelUsuarioLogueado();
    }

    // 👤 CREAR CITA
    @PostMapping
    public Cita crear(@RequestBody Cita cita) {
        return citaService.crearCitaParaUsuarioLogueado(cita);
    }

    // 🔥 CANCELAR
    @PutMapping("/cancelar/{id}")
    public Cita cancelar(@PathVariable Long id) {
        return citaService.cancelarCita(id);
    }

    // 🔥 CONFIRMAR (ADMIN)
    @PutMapping("/confirmar/{id}")
    public Cita confirmar(@PathVariable Long id) {
        return citaService.confirmarCita(id);
    }

    // 🔥 👉 ESTE ES EL QUE TE FALTABA 👈
    @GetMapping("/disponibles")
    public List<LocalTime> obtenerHorasDisponibles(
            @RequestParam Long medicoId,
            @RequestParam String fecha
    ) {
        return citaService.obtenerHorasDisponibles(medicoId, fecha);
    }

    // 📊 STATS ADMIN
    @GetMapping("/stats")
    public Map<String, Object> obtenerStats() {

        List<Cita> citas = citaRepository.findAll();

        long total = citas.size();

        long confirmadas = citas.stream()
                .filter(c -> c.getEstado() == EstadoCita.CONFIRMADA)
                .count();

        long canceladas = citas.stream()
                .filter(c -> c.getEstado() == EstadoCita.CANCELADA)
                .count();

        long hoy = citas.stream()
                .filter(c -> c.getFecha() != null &&
                        c.getFecha().toLocalDate().equals(LocalDate.now()))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("confirmadas", confirmadas);
        stats.put("canceladas", canceladas);
        stats.put("hoy", hoy);

        return stats;
    }
}