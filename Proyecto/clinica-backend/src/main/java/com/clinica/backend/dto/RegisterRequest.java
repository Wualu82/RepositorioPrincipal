package com.clinica.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class RegisterRequest {

    @Email(message = "Email no válido")
    @Pattern(
    regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    message = "El email debe tener un formato correcto"
    )
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Pattern(
    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message = "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"
    )
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$",
             message = "El nombre solo puede contener letras")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$",
             message = "El apellido solo puede contener letras")
    private String apellido;

    @Pattern(
    regexp = "^[6789]\\d{8}$",
    message = "Teléfono no válido (9 dígitos, empieza por 6,7,8 o 9)"
    )
    @NotBlank(message = "El teléfono es obligatorio")
    private String telefono;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate fechaNacimiento;

    public RegisterRequest() {}

    // ===== GETTERS =====

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    // ===== SETTERS =====

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
}