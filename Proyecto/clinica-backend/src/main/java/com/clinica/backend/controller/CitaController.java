package com.clinica.backend.controller;

import com.clinica.backend.model.Cita;
import com.clinica.backend.service.CitaService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/citas")
public class CitaController {

    private final CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    // 👑 ADMIN
    @GetMapping
    public List<Cita> obtenerTodas() {
        return citaService.obtenerTodas();
    }

    // 👤 PACIENTE
    @GetMapping("/mis-citas")
    public List<Cita> misCitas() {
        return citaService.obtenerCitasDelUsuarioLogueado();
    }

    // 👤 CREAR
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
    @GetMapping("/disponibles")
public List<LocalTime> obtenerHorasDisponibles(
        @RequestParam Long medicoId,
        @RequestParam String fecha
) {
    return citaService.obtenerHorasDisponibles(medicoId, fecha);
}
    
}