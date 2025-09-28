const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Agregar comentario (general o por libro) con nombre del usuario
router.post('/', (req, res) => {
  const { usuario_id, libro_id, contenido } = req.body;
  if (!usuario_id || !contenido) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.run(
    `INSERT INTO comentarios (usuario_id, libro_id, contenido) VALUES (?, ?, ?)`,
    [usuario_id, libro_id || null, contenido],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      // Obtener nombre del usuario y devolver junto al comentario
      db.get(
        `SELECT nombre FROM usuarios WHERE id = ?`,
        [usuario_id],
        (err2, usuario) => {
          if (err2) return res.status(500).json({ error: err2.message });

          res.json({
            id: this.lastID,
            usuario_id,
            libro_id,
            contenido,
            fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
            nombre: usuario?.nombre || 'Anónimo'
          });
        }
      );
    }
  );
});

// ✅ Obtener comentarios por libro
router.get('/libro/:libro_id', (req, res) => {
  const { libro_id } = req.params;
  db.all(
    `SELECT c.*, u.nombre FROM comentarios c
     JOIN usuarios u ON c.usuario_id = u.id
     WHERE libro_id = ? ORDER BY fecha DESC`,
    [libro_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ✅ Obtener comentarios generales (sin libro_id)
router.get('/generales', (req, res) => {
  db.all(
    `SELECT c.*, u.nombre FROM comentarios c
     JOIN usuarios u ON c.usuario_id = u.id
     WHERE libro_id IS NULL ORDER BY fecha DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;

