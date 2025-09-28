// Inicio de sesión
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificador = document.getElementById('login-identificador').value.trim();
  const contraseña = document.getElementById('login-contraseña').value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificador, contraseña })
    });

    if (!res.ok) {
      const texto = await res.text();
      throw new Error('Respuesta no válida: ' + texto.slice(0, 100));
    }

    const data = await res.json();
    alert('Bienvenido, ' + data.nombre);

    // ✅ Guardar nombre e ID del usuario
    localStorage.setItem('usuarioNombre', data.nombre);
    localStorage.setItem('usuario_id', data.id);

    // ✅ Redirigir a la biblioteca
    window.location.href = 'index.html';

  } catch (err) {
    alert('Error al iniciar sesión: ' + err.message);
  }
});

// Cierre de sesión
document.getElementById('cerrar-sesion')?.addEventListener('click', () => {
  localStorage.removeItem('usuario_id');
  localStorage.removeItem('usuarioNombre');
  alert('Sesión cerrada correctamente');
  window.location.href = 'login.html'; // o 'index.html' si prefieres
});

