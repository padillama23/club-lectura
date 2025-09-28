const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./usuarios.db');

db.serialize(() => {
  // Tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL
  )`);

  // Tabla de libros
  db.run(`CREATE TABLE IF NOT EXISTS libros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    titulo TEXT NOT NULL,
    autor TEXT,
    categoria TEXT,
    portada TEXT,
    resumen TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`);

  // Tabla de comentarios
  db.run(`CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    libro_id INTEGER,
    texto TEXT NOT NULL,
    fecha TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
  )`);

  // Tabla de favoritos
  db.run(`CREATE TABLE IF NOT EXISTS favoritos (
    usuario_id INTEGER,
    libro_id INTEGER,
    PRIMARY KEY (usuario_id, libro_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
  )`);

  // Tabla de historial de lectura
  db.run(`CREATE TABLE IF NOT EXISTS historial_lectura (
    usuario_id INTEGER,
    libro_id INTEGER,
    fecha_lectura TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, libro_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
  )`);
});

module.exports = db;
