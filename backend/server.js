const express = require('express');
const cors = require('cors'); // ✅ Solo una vez
const usuarios = require('./routes/usuarios');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarios);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
