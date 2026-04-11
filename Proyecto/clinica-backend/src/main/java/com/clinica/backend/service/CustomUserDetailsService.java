package com.clinica.backend.service;

import com.clinica.backend.model.Usuario;
import com.clinica.backend.repository.UsuarioRepository;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        System.out.println("🔍 LOGIN USER: " + usuario.getEmail());
        System.out.println("🔍 PASSWORD BD: " + usuario.getPassword());
        System.out.println("🔍 ROL: " + usuario.getRol());

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getPassword(),
                List.of(
                        // 🔥 CLAVE DEL PROBLEMA → AÑADIR ROLE_
                        new SimpleGrantedAuthority("ROLE_" + usuario.getRol())
                )
        );
    }
}