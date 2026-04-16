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
            .cors(cors -> {}) 
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // 🔓 AUTH
                .requestMatchers("/auth/**").permitAll()

                // 👨‍⚕️ MÉDICOS (PÚBLICO)
                .requestMatchers("/medicos/**").permitAll()

                // 👤 PACIENTES (PARA ADMIN → NUEVA CITA)
                .requestMatchers("/pacientes/**").hasRole("ADMIN")

                // 🕒 HORAS DISPONIBLES
                .requestMatchers(HttpMethod.GET, "/citas/disponibles")
                .hasAnyRole("PACIENTE", "ADMIN")

                // 👤 MIS CITAS
                .requestMatchers("/citas/mis-citas")
                .hasAnyRole("PACIENTE", "ADMIN")

                // ➕ CREAR CITA (PACIENTE)(y admin ahora con modificacion donde admin tambien crea citas para otros)
                .requestMatchers(HttpMethod.POST, "/citas")
                .hasAnyRole("PACIENTE", "ADMIN")

                // 👑 ADMIN → VER TODAS
                .requestMatchers(HttpMethod.GET, "/citas")
                .hasRole("ADMIN")

                // 📊 STATS
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