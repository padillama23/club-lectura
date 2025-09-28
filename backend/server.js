const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

// 🛡️ Seguridad CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
}));

// 🌐 CORS y JSON
app.use(cors());
app.use(express.json());

// 📁 Servir archivos estáticos del frontend
app.use(express.static(__dirname + '/../frontend'));

// 📄 Servir PDFs directamente
app.use('/Libros', express.static(__dirname + '/frontend/Libros'));

// 🔗 Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/favoritos', require('./routes/favoritos'));
app.use('/api/historial', require('./routes/historial'));

// 🏠 Ruta principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../frontend/index.html');

});

// 🚀 Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
