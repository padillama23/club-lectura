const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar lectura
router.post('/', (req, res) => {
  const { usuario_id, libro_id } = req.body;
  db.run(`INSERT OR REPLACE INTO historial_lectura (usuario_id, libro_id, fecha_lectura) VALUES (?, ?, datetime('now'))`,
    [usuario_id, libro_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Lectura registrada' });
    });
});

// Obtener historial de un usuario
router.get('/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  db.all(`SELECT libros.*, historial_lectura.fecha_lectura FROM historial_lectura
          JOIN libros ON historial_lectura.libro_id = libros.id
          WHERE historial_lectura.usuario_id = ?`,
    [usuario_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
});

module.exports = router;
