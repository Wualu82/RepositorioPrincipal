import { regex, validarValor } from './validaciones.js';

/**
 * Valida un campo del formulario y actualiza la interfaz gráfica.
 * Añade o elimina clases CSS y muestra mensajes de error.
 * 
 * @param {HTMLInputElement} input - Campo de entrada a validar
 * @param {RegExp} pattern - Expresión regular utilizada para validar el campo
 * @param {HTMLElement} errorElement - Elemento donde se muestra el mensaje de error
 * @param {string} mensaje - Mensaje de error a mostrar si no es válido
 * @returns {boolean} Devuelve true si el campo es válido, false si no lo es
 */
function validarCampo(input, pattern, errorElement, mensaje) {
  if (!validarValor(input.value, pattern)) {
    errorElement.textContent = mensaje;
    input.classList.add('invalid');
    input.classList.remove('valid');
    return false;
  }

  errorElement.textContent = '';
  input.classList.remove('invalid');
  input.classList.add('valid');
  return true;
}

/**
 * Inicializa todos los eventos del formulario una vez que el DOM está cargado.
 * Se encarga de:
 * - Asignar eventos de validación en tiempo real
 * - Gestionar eventos de foco (focus/blur)
 * - Controlar el envío del formulario
 */
document.addEventListener('DOMContentLoaded', () => {

  /** @type {HTMLFormElement} */
  const form = document.getElementById('registroForm');

  /** @type {HTMLInputElement} */
  const nombre = document.getElementById('nombre');

  /** @type {HTMLInputElement} */
  const email = document.getElementById('email');

  /** @type {HTMLInputElement} */
  const telefono = document.getElementById('telefono');

  /** @type {HTMLInputElement} */
  const password = document.getElementById('password');

  /**
   * Mensaje de error para la contraseña
   * @constant {string}
   */
  const mensajePassword =
    'Debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y carácter especial';

  /**
   * Eventos de focus y blur para resaltar los campos
   */
  [nombre, email, telefono, password].forEach(input => {
    input.addEventListener('focus', () => {
      input.style.backgroundColor = '#e6f2ff';
    });

    input.addEventListener('blur', () => {
      input.style.backgroundColor = '';
    });
  });

  /**
   * Validación en tiempo real del campo nombre
   */
  nombre.addEventListener('input', () =>
    validarCampo(nombre, regex.nombre, document.getElementById('errorNombre'), 'Nombre inválido (solo letras)')
  );

  /**
   * Validación en tiempo real del email
   */
  email.addEventListener('input', () =>
    validarCampo(email, regex.email, document.getElementById('errorEmail'), 'Email inválido')
  );

  /**
   * Validación en tiempo real del teléfono
   */
  telefono.addEventListener('input', () =>
    validarCampo(telefono, regex.telefono, document.getElementById('errorTelefono'), 'Formato: +34 600-123-456')
  );

  /**
   * Validación en tiempo real de la contraseña
   */
  password.addEventListener('input', () =>
    validarCampo(password, regex.password, document.getElementById('errorPassword'), mensajePassword)
  );

  /**
   * Evento submit del formulario.
   * Evita el envío si hay errores y valida todos los campos.
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validNombre = validarCampo(nombre, regex.nombre, document.getElementById('errorNombre'), 'Nombre inválido');
    const validEmail = validarCampo(email, regex.email, document.getElementById('errorEmail'), 'Email inválido');
    const validTel = validarCampo(telefono, regex.telefono, document.getElementById('errorTelefono'), 'Teléfono inválido');
    const validPass = validarCampo(password, regex.password, document.getElementById('errorPassword'), mensajePassword);

    if (validNombre && validEmail && validTel && validPass) {
      alert('Registro completado ✅');
    }
  });

});