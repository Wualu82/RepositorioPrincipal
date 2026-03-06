<?php
require_once "Persona.php";

/**
 * Clase Estudiante
 * Hereda de Persona.
 */
class Estudiante extends Persona {

    private $codigoEstudiante;

    public function __construct($nombre, $email, $codigoEstudiante) {
        parent::__construct($nombre, $email);
        $this->codigoEstudiante = $codigoEstudiante;
    }

    public function getCodigo() {
        return $this->codigoEstudiante;
    }

    // Polimorfismo (sobrescritura)
    public function mostrarInformacion() {
        return parent::mostrarInformacion() . " | Código: {$this->codigoEstudiante}";
    }
}