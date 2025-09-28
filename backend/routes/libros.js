const express = require('express');
const router = express.Router();
const db = require('../db');

// Insertar nuevo libro
router.post('/', (req, res) => {
  const { usuario_id, titulo, autor, categoria, portada, resumen } = req.body;
  db.run(`INSERT INTO libros (usuario_id, titulo, autor, categoria, portada, resumen) VALUES (?, ?, ?, ?, ?, ?)`,
    [usuario_id, titulo, autor, categoria, portada, resumen],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// Obtener todos los libros
router.get('/', (req, res) => {
  db.all('SELECT * FROM libros', [], (err, rows) => {
    if (err) {
      console.error('❌ Error al consultar libros:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Buscar libros por título, autor o categoría
router.get('/buscar', (req, res) => {
  const { q } = req.query;
  db.all(`SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ? OR categoria LIKE ?`,
    [`%${q}%`, `%${q}%`, `%${q}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

module.exports = router;
