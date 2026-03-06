<?php
/**
 * Clase Persona
 * Esto representa la entidad base del sistema.
 */
class Persona {

    protected $nombre;
    protected $email;

    public function __construct($nombre, $email) {
        $this->nombre = $nombre;
        $this->email = $email;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getEmail() {
        return $this->email;
    }

    public function mostrarInformacion() {
        return "Nombre: {$this->nombre} | Email: {$this->email}";
    }
}