/**
 * @file validation.test.js
 * @description Pruebas unitarias para validar las expresiones regulares
 * utilizadas en el formulario de registro.
 * 
 * Se comprueban distintos casos válidos e inválidos para:
 * - Nombre
 * - Email
 * - Teléfono
 * - Contraseña
 */

import { validarValor, regex } from '../validaciones.js';

/**
 * Conjunto de pruebas para validar los campos del formulario
 */
describe('Validaciones de formulario', () => {

  //  NOMBRE
  test('Nombre válido', () => {
    expect(validarValor('Juan Pérez', regex.nombre)).toBe(true);
  });

  test('Nombre inválido (con números)', () => {
    expect(validarValor('Juan123', regex.nombre)).toBe(false);
  });

  test('Nombre inválido (muy corto)', () => {
    expect(validarValor('J', regex.nombre)).toBe(false);
  });

  //  EMAIL
  test('Email válido', () => {
    expect(validarValor('test@test.com', regex.email)).toBe(true);
  });

  test('Email inválido (sin dominio)', () => {
    expect(validarValor('test@com', regex.email)).toBe(false);
  });

  test('Email inválido (sin @)', () => {
    expect(validarValor('testtest.com', regex.email)).toBe(false);
  });

  //  TELÉFONO
  test('Teléfono válido', () => {
    expect(validarValor('+34 600-123-456', regex.telefono)).toBe(true);
  });

  test('Teléfono inválido (sin formato)', () => {
    expect(validarValor('600123456', regex.telefono)).toBe(false);
  });

  test('Teléfono inválido (prefijo incorrecto)', () => {
    expect(validarValor('+33 600-123-456', regex.telefono)).toBe(false);
  });

  //  PASSWORD
  test('Password válida', () => {
    expect(validarValor('Aa123456!', regex.password)).toBe(true);
  });

  test('Password inválida (sin mayúscula)', () => {
    expect(validarValor('aa123456!', regex.password)).toBe(false);
  });

  test('Password inválida (sin número)', () => {
    expect(validarValor('Aaabcdef!', regex.password)).toBe(false);
  });

  test('Password inválida (sin carácter especial)', () => {
    expect(validarValor('Aa123456', regex.password)).toBe(false);
  });

  test('Password inválida (menos de 8 caracteres)', () => {
    expect(validarValor('Aa1!', regex.password)).toBe(false);
  });

});