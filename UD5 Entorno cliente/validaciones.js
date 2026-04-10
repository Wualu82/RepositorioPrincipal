/**
 * Conjunto de expresiones regulares utilizadas para validar
 * los diferentes campos del formulario de registro.
 * 
 * @constant {Object}
 * @property {RegExp} nombre - Valida nombres con letras y espacios (mínimo 2 caracteres)
 * @property {RegExp} email - Valida formato de correo electrónico
 * @property {RegExp} telefono - Valida teléfono en formato internacional español
 * @property {RegExp} password - Valida contraseña segura
 */
export const regex = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^\+34\s\d{3}-\d{3}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
};

/**
 * Valida un valor utilizando una expresión regular.
 * 
 * @param {string} valor - Texto introducido por el usuario
 * @param {RegExp} pattern - Expresión regular con la que se valida el valor
 * @returns {boolean} Devuelve true si el valor cumple el patrón, false en caso contrario
 */
export function validarValor(valor, pattern) {
  return pattern.test(valor);
}