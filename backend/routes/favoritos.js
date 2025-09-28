const express = require('express');
const router = express.Router();
const db = require('../db');

// Marcar libro como favorito
router.post('/', (req, res) => {
  const { usuario_id, libro_id } = req.body;
  db.run(`INSERT INTO favoritos (usuario_id, libro_id) VALUES (?, ?)`,
    [usuario_id, libro_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Libro marcado como favorito' });
    });
});

// Obtener favoritos de un usuario
router.get('/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  db.all(`SELECT libros.* FROM favoritos
          JOIN libros ON favoritos.libro_id = libros.id
          WHERE favoritos.usuario_id = ?`,
    [usuario_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

module.exports = router;
