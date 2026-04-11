package com.clinica.backend.config;

import com.clinica.backend.service.CustomUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtFilter jwtFilter, CustomUserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    // 🔐 PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔐 AUTH PROVIDER
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // 🔐 AUTH MANAGER
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // 🔐 SECURITY CONFIG
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {}) // usa tu CorsConfig.java
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

    // 🔓 AUTH
    .requestMatchers("/auth/**").permitAll()

    // 🔥 MUY IMPORTANTE → PRIMERO LAS ESPECÍFICAS

    // 🕒 HORAS DISPONIBLES
    .requestMatchers(HttpMethod.GET, "/citas/disponibles")
    .hasAnyRole("PACIENTE", "ADMIN")

    // 👤 MIS CITAS
    .requestMatchers("/citas/mis-citas")
    .hasAnyRole("PACIENTE", "ADMIN")

    // ➕ CREAR
    .requestMatchers(HttpMethod.POST, "/citas")
    .hasRole("PACIENTE")

    // 👨‍⚕️ MÉDICOS
    .requestMatchers(HttpMethod.GET, "/medicos/**")
    .hasAnyRole("PACIENTE", "ADMIN")

    // 👑 ADMIN (GENÉRICO AL FINAL)
    .requestMatchers(HttpMethod.GET, "/citas")
    .hasRole("ADMIN")

    .requestMatchers("/citas/stats")
    .hasRole("ADMIN")

    // ❌ CANCELAR
    .requestMatchers(HttpMethod.PUT, "/citas/cancelar/**")
    .hasAnyRole("PACIENTE", "ADMIN")

    // ✅ CONFIRMAR
    .requestMatchers(HttpMethod.PUT, "/citas/confirmar/**")
    .hasRole("ADMIN")

    .anyRequest().authenticated()
)

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authenticationProvider(authenticationProvider())

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}