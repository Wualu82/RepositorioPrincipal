// Importación de módulos necesarios
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Inicialización de la aplicación
const app = express();

// Middleware para permitir peticiones externas y trabajar con JSON
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TU_PASSWORD',
  database: 'tienda'
});

// Comprobación de la conexión a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta de prueba para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Ruta GET: obtiene todos los clientes junto con el nombre del país
// Se utiliza LEFT JOIN para incluir clientes aunque no tengan país asignado
app.get('/clientes', (req, res) => {
  const query = `
    SELECT 
      cliente.id_cliente,
      cliente.nombre,
      cliente.edad,
      pais.nombre AS pais_nombre
    FROM cliente
    LEFT JOIN pais ON cliente.id_pais = pais.id_pais
  `;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ruta GET: obtiene todos los países (para rellenar los select del frontend)
app.get('/paises', (req, res) => {
  connection.query('SELECT * FROM pais', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ruta POST: inserta un nuevo cliente en la base de datos
app.post('/clientes', (req, res) => {
  const { nombre, edad, id_pais } = req.body;

  // Validación básica de datos obligatorios
  if (!nombre || !edad) {
    return res.status(400).send('Datos incompletos');
  }

  const query = 'INSERT INTO cliente (nombre, edad, id_pais) VALUES (?, ?, ?)';

  // Uso de parámetros para evitar inyección SQL
  connection.query(query, [nombre, edad, id_pais || null], (err) => {
    if (err) return res.status(500).send(err);

    res.send('Cliente añadido correctamente');
  });
});

// Ruta DELETE: elimina un cliente por su ID
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM cliente WHERE id_cliente = ?',
    [id],
    (err) => {
      if (err) return res.status(500).send(err);

      res.send('Cliente eliminado');
    }
  );
});

// Ruta PUT: actualiza los datos de un cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, id_pais } = req.body;

  // Validación de datos obligatorios
  if (!nombre || !edad) {
    return res.status(400).send('Datos incompletos');
  }

  // Validación adicional: comprobar que el país existe
  if (id_pais) {
    connection.query(
      'SELECT * FROM pais WHERE id_pais = ?',
      [id_pais],
      (err, results) => {

        if (err) return res.status(500).send(err);

        // Si el país no existe, se cancela la operación
        if (results.length === 0) {
          return res.status(400).send('País no válido');
        }

        actualizarCliente();
      }
    );
  } else {
    actualizarCliente();
  }

  // Función interna que ejecuta la actualización
  function actualizarCliente() {
    const query = `
      UPDATE cliente 
      SET nombre = ?, edad = ?, id_pais = ?
      WHERE id_cliente = ?
    `;

    connection.query(query, [nombre, edad, id_pais || null, id], (err) => {
      if (err) return res.status(500).send(err);

      res.send('Cliente actualizado');
    });
  }
});

// Inicio del servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});