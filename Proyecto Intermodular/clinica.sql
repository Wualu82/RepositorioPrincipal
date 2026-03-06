CREATE DATABASE IF NOT EXISTS clinica;
USE clinica_medica;


CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('USER','ADMIN') DEFAULT 'USER',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE especialidad (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE medico (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_especialidad INT NOT NULL,
    
    FOREIGN KEY (id_especialidad) 
        REFERENCES especialidad(id_especialidad)
        ON DELETE CASCADE
);



CREATE TABLE cita (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    estado ENUM('PENDIENTE','CONFIRMADA','CANCELADA') DEFAULT 'PENDIENTE',
    id_usuario INT NOT NULL,
    id_medico INT NOT NULL,
    
    FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
        
    FOREIGN KEY (id_medico) 
        REFERENCES medico(id_medico)
        ON DELETE CASCADE
);



-- Especialidades
INSERT INTO especialidad (nombre) VALUES
('Cardiologia'),
('Pediatria'),
('Dermatologia');
('Urologia'),
('Traumatologo'),
('Medicina general');
('Enfermeria'),
('Endocrinologia'),

-- Médicos
INSERT INTO medico (nombre, id_especialidad) VALUES
('Dr. Carlos Martinez', 1),
('Dra. Laura Gomez', 2),
('Dr. Antonio Ruiz', 3);
('Dr. Alfredo Gregori', 4),
('Dra. Bill Ortiz', 5),
('Dr. Alfonso Hernandez', 6);

-- Usuarios
INSERT INTO usuario (nombre, email, password, rol) VALUES
('Juan Perez', 'juan@email.com', '1234', 'USER'),
('Maria Lopez', 'maria@email.com', '1234', 'USER'),
('Administrador', 'admin@clinica.com', 'admin123', 'ADMIN');

-- Citas de prueba
INSERT INTO cita (fecha, estado, id_usuario, id_medico) VALUES
('2026-03-20 10:00:00', 'PENDIENTE', 1, 1),
('2026-03-22 12:30:00', 'CONFIRMADA', 2, 2);