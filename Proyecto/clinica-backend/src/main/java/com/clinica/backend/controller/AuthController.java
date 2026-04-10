package com.clinica.backend.controller;

import com.clinica.backend.dto.RegisterRequest;
import com.clinica.backend.model.Usuario;
import com.clinica.backend.model.Paciente;
import com.clinica.backend.repository.UsuarioRepository;
import com.clinica.backend.repository.PacienteRepository;
import com.clinica.backend.config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= LOGIN =================
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // 🔥 BUSCAR USUARIO PARA OBTENER ROL
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = jwtUtil.generateToken(email);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("rol", usuario.getRol()); // 🔥 CLAVE

        return response;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequest request) {

        // comprobar si ya existe
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // crear usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol("PACIENTE");
        usuario.setActivo(true);

        usuarioRepository.save(usuario);

        // crear paciente asociado
        Paciente paciente = new Paciente();
        paciente.setNombre(request.getNombre());
        paciente.setApellido(request.getApellido());
        paciente.setTelefono(request.getTelefono());
        paciente.setEmail(request.getEmail());
        paciente.setFechaNacimiento(request.getFechaNacimiento());
        paciente.setUsuario(usuario);

        pacienteRepository.save(paciente);

        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Usuario registrado correctamente");

        return response;
    }
    @PostMapping("/hash")
        public Map<String, String> hashPassword(@RequestBody Map<String, String> request) {

        String rawPassword = request.get("password");

        String hashed = passwordEncoder.encode(rawPassword);

        return Map.of("hash", hashed);
    }    
}