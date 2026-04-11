package com.clinica.backend.service;

import com.clinica.backend.model.*;
import com.clinica.backend.repository.*;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final HorarioMedicoRepository horarioMedicoRepository;
    private final UsuarioRepository usuarioRepository;

    public CitaService(CitaRepository citaRepository,
                       PacienteRepository pacienteRepository,
                       MedicoRepository medicoRepository,
                       HorarioMedicoRepository horarioMedicoRepository,
                       UsuarioRepository usuarioRepository) {
        this.citaRepository = citaRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.horarioMedicoRepository = horarioMedicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // 👑 ADMIN → ver todas
    public List<Cita> obtenerTodas() {
        return citaRepository.findAll();
    }

    // 👤 MIS CITAS (FIX ADMIN)
    public List<Cita> obtenerCitasDelUsuarioLogueado() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 🔥 ADMIN VE TODAS
        if (usuario.getRol().equals("ADMIN")) {
            return citaRepository.findAll();
        }

        // 👤 PACIENTE VE SOLO LAS SUYAS
        Paciente paciente = pacienteRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        return citaRepository.findByPaciente_Id(paciente.getId());
    }

    // 👤 CREAR CITA
    public Cita crearCitaParaUsuarioLogueado(Cita cita) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Paciente paciente = pacienteRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        cita.setPaciente(paciente);

        // ❌ FECHAS PASADAS
        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No puedes crear citas en el pasado");
        }

        // ❌ MÉDICO
        if (cita.getMedico() == null || cita.getMedico().getId() == null) {
            throw new RuntimeException("Debe proporcionar un medicoId válido");
        }

        Medico medico = medicoRepository.findById(cita.getMedico().getId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        cita.setMedico(medico);

        // 🔥 DÍA CORRECTO (EN INGLÉS → COINCIDE CON BD)
        DiaSemana diaEnum = DiaSemana.valueOf(cita.getFecha().getDayOfWeek().name());

        List<HorarioMedico> horarios = horarioMedicoRepository
                .findByMedico_IdAndDiaSemana(medico.getId(), diaEnum);

        if (horarios.isEmpty()) {
            throw new RuntimeException("El médico no trabaja ese día");
        }

        LocalTime hora = cita.getFecha().toLocalTime();

        boolean dentroHorario = horarios.stream().anyMatch(h ->
                (hora.equals(h.getHoraInicio()) || hora.isAfter(h.getHoraInicio()))
                        && hora.isBefore(h.getHoraFin())
        );

        if (!dentroHorario) {
            throw new RuntimeException("Hora fuera del horario del médico");
        }

        boolean existe = citaRepository.existsByMedico_IdAndFecha(medico.getId(), cita.getFecha());

        if (existe) {
            throw new RuntimeException("Ya existe una cita en esa fecha");
        }

        cita.setEstado(EstadoCita.PENDIENTE);

        return citaRepository.save(cita);
    }

    // 🔥 HORAS DISPONIBLES
    public List<LocalTime> obtenerHorasDisponibles(Long medicoId, String fechaStr) {

        LocalDate fecha = LocalDate.parse(fechaStr);

        // 🔥 CLAVE → MISMO FORMATO QUE BD (MONDAY, etc)
        DiaSemana diaEnum = DiaSemana.valueOf(fecha.getDayOfWeek().name());

        List<HorarioMedico> horarios = horarioMedicoRepository
                .findByMedico_IdAndDiaSemana(medicoId, diaEnum);

        if (horarios.isEmpty()) {
            return List.of();
        }

        List<LocalTime> disponibles = new ArrayList<>();

        for (HorarioMedico horario : horarios) {

            LocalTime hora = horario.getHoraInicio();

            while (hora.isBefore(horario.getHoraFin())) {

                boolean ocupada = citaRepository
                        .existsByMedico_IdAndFecha(medicoId, LocalDateTime.of(fecha, hora));

                if (!ocupada) {
                    disponibles.add(hora);
                }

                hora = hora.plusMinutes(30);
            }
        }

        return disponibles;
    }

    // 🔥 CANCELAR
    public Cita cancelarCita(Long citaId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Cita cita = citaRepository.findById(citaId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (cita.getEstado() == EstadoCita.CANCELADA) {
            throw new RuntimeException("La cita ya está cancelada");
        }

        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No puedes cancelar una cita pasada");
        }

        if (usuario.getRol().equals("PACIENTE")) {

            Paciente paciente = pacienteRepository.findByUsuario(usuario)
                    .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

            if (!cita.getPaciente().getId().equals(paciente.getId())) {
                throw new RuntimeException("No puedes cancelar esta cita");
            }
        }

        cita.setEstado(EstadoCita.CANCELADA);

        return citaRepository.save(cita);
    }

    // 🔥 CONFIRMAR
    public Cita confirmarCita(Long citaId) {

        Cita cita = citaRepository.findById(citaId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (cita.getEstado() == EstadoCita.CONFIRMADA) {
            throw new RuntimeException("La cita ya está confirmada");
        }

        if (cita.getEstado() == EstadoCita.CANCELADA) {
            throw new RuntimeException("No puedes confirmar una cita cancelada");
        }

        cita.setEstado(EstadoCita.CONFIRMADA);

        return citaRepository.save(cita);
    }
}