<?php
require_once "models/Estudiante.php";
require_once "models/Curso.php";

/**
 * Controlador del sistema de cursos.
 */
class CursoController {

    public function ejecutar() {

        // Creamos los estudiantes
        $est1 = new Estudiante("Ana", "ana@email.com", "E001");
        $est2 = new Estudiante("Luis", "luis@email.com", "E002");
        $est3 = new Estudiante("Marta", "marta@email.com", "E003");

        // Creamos el curso con cupo limitado
        $curso = new Curso("Programación en PHP", 2);

        // Las inscripciones
        $mensaje1 = $curso->inscribirEstudiante($est1);
        $mensaje2 = $curso->inscribirEstudiante($est2);
        $mensaje3 = $curso->inscribirEstudiante($est3); // Aquí se activa el condicional

        // Envia datos a la vista
        require "views/cursoVista.php";
    }
}