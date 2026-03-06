<?php
/**
 * Clase Curso
 * Representamos un curso dentro del sistema.
 */
class Curso {

    private $nombreCurso;
    private $cupoMaximo;
    private $estudiantesInscritos = [];

    public function __construct($nombreCurso, $cupoMaximo) {
        $this->nombreCurso = $nombreCurso;
        $this->cupoMaximo = $cupoMaximo;
    }

    /**
     * El método para inscribir a los estudiantes
     */
    public function inscribirEstudiante(Estudiante $estudiante) {

        // Condicional para validar el cupo
        if (count($this->estudiantesInscritos) < $this->cupoMaximo) {

            $this->estudiantesInscritos[] = $estudiante;
            return "Estudiante {$estudiante->getNombre()} inscrito correctamente.";
        } else {
            return "No hay cupos disponibles en el curso.";
        }
    }

    public function mostrarCurso() {

        $info = "Curso: {$this->nombreCurso} | Cupo máximo: {$this->cupoMaximo}<br>";
        $info .= "Estudiantes inscritos: " . count($this->estudiantesInscritos) . "<br>";

        foreach ($this->estudiantesInscritos as $est) {
            $info .= "- " . $est->mostrarInformacion() . "<br>";
        }

        return $info;
    }
}