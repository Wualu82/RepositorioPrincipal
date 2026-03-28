export const regex = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^\+34\s\d{3}-\d{3}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
};

export function validarValor(valor, pattern) {
  return pattern.test(valor);
}