const regex = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^\+34\s\d{3}-\d{3}-\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
};

function validarCampo(input, pattern, errorElement, mensaje) {
  if (!pattern.test(input.value)) {
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

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('registroForm');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const password = document.getElementById('password');

  const mensajePassword = 
    'Debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y carácter especial';

  // Validación en tiempo real
  nombre.addEventListener('input', () =>
    validarCampo(nombre, regex.nombre, document.getElementById('errorNombre'), 'Nombre inválido (solo letras)')
  );

  email.addEventListener('input', () =>
    validarCampo(email, regex.email, document.getElementById('errorEmail'), 'Email inválido')
  );

  telefono.addEventListener('input', () =>
    validarCampo(telefono, regex.telefono, document.getElementById('errorTelefono'), 'Formato: +34 600-123-456')
  );

  password.addEventListener('input', () =>
    validarCampo(password, regex.password, document.getElementById('errorPassword'), mensajePassword)
  );

  // Envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validNombre = validarCampo(nombre, regex.nombre, document.getElementById('errorNombre'), 'Nombre inválido');
    const validEmail = validarCampo(email, regex.email, document.getElementById('errorEmail'), 'Email inválido');
    const validTel = validarCampo(telefono, regex.telefono, document.getElementById('errorTelefono'), 'Teléfono inválido');
    const validPass = validarCampo(password, regex.password, document.getElementById('errorPassword'), mensajePassword);

    if (validNombre && validEmail && validTel && validPass) {
      alert('Registro exitoso ✅');
    }
  });
});