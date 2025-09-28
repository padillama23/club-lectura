document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://localhost:3000/api';
  const contenedor = document.getElementById('contenedor-libros');
  const buscador = document.getElementById('buscador');
  const filtro = document.getElementById('filtro-categoria');

  let libros = [];

  async function cargarLibros() {
    try {
      const res = await fetch(`${API}/libros`);
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

      libros = await res.json();
      mostrarLibros(libros);
    } catch (error) {
      console.error('❌ Error al cargar libros:', error.message);
      contenedor.innerHTML = `<p style="color:red;">No se pudieron cargar los libros. Verifica el servidor.</p>`;
    }
  }

  function mostrarLibros(librosFiltrados) {
    contenedor.innerHTML = '';
    if (librosFiltrados.length === 0) {
      contenedor.innerHTML = `<p style="color:gray;">No hay libros que coincidan con tu búsqueda.</p>`;
      return;
    }

    librosFiltrados.forEach(libro => {
      const div = document.createElement('div');
      div.className = `libro ${libro.categoria}`;

      const img = document.createElement('img');
      img.src = libro.portada;
      img.alt = libro.titulo;

      const titulo = document.createElement('h4');
      titulo.textContent = libro.titulo;

      const autor = document.createElement('p');
      autor.innerHTML = `<strong>Autor:</strong> ${libro.autor}`;

      const tienePDF = libro.pdf_url && typeof libro.pdf_url === 'string' && libro.pdf_url.trim() !== '';
      const pdfCodificado = tienePDF ? encodeURIComponent(libro.pdf_url.trim()) : null;
      const enlacePDF = tienePDF
        ? document.createElement('a')
        : document.createElement('span');

      if (tienePDF) {
        enlacePDF.href = `http://localhost:3000/Libros/${pdfCodificado}`;
        enlacePDF.target = '_blank';
        enlacePDF.textContent = '📖 Leer PDF';
      } else {
        enlacePDF.textContent = 'PDF no disponible';
        enlacePDF.style.color = 'gray';
      }

      const btnComentarios = document.createElement('button');
      btnComentarios.textContent = '🔽 Mostrar comentarios';
      btnComentarios.addEventListener('click', () => toggleComentarios(libro.id));

      const btnFavorito = document.createElement('button');
      btnFavorito.textContent = '❤️ Favorito';
      btnFavorito.addEventListener('click', () => marcarFavorito(libro.id));

      const form = document.createElement('form');
      const textarea = document.createElement('textarea');
      textarea.placeholder = 'Escribe tu comentario...';
      textarea.required = true;

      const btnEnviar = document.createElement('button');
      btnEnviar.type = 'submit';
      btnEnviar.textContent = 'Enviar comentario';

      form.appendChild(textarea);
      form.appendChild(btnEnviar);
      form.addEventListener('submit', e => enviarComentario(e, libro.id));

      const comentariosDiv = document.createElement('div');
      comentariosDiv.className = 'comentarios-expandibles';
      comentariosDiv.id = `comentarios-${libro.id}`;
      comentariosDiv.style.display = 'none';
      comentariosDiv.innerHTML = '<p style="color: gray;">Cargando comentarios...</p>';

      div.append(img, titulo, autor, enlacePDF, btnComentarios, btnFavorito, form, comentariosDiv);
      contenedor.appendChild(div);
    });
  }

  function filtrarLibros() {
    const texto = buscador.value.toLowerCase();
    const categoria = filtro.value;
    const filtrados = libros.filter(libro => {
      const coincideTexto = libro.titulo.toLowerCase().includes(texto);
      const coincideCategoria = categoria === 'todos' || libro.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
    mostrarLibros(filtrados);
  }

  buscador.addEventListener('input', filtrarLibros);
  filtro.addEventListener('change', filtrarLibros);

  async function toggleComentarios(libroId) {
    const contenedor = document.getElementById(`comentarios-${libroId}`);
    const visible = contenedor.style.display === 'block';

    if (visible) {
      contenedor.style.display = 'none';
      return;
    }

    contenedor.style.display = 'block';
    contenedor.innerHTML = '<p style="color: gray;">Cargando comentarios...</p>';

    try {
      const res = await fetch(`${API}/comentarios/libro/${libroId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const comentarios = await res.json();

      if (comentarios.length === 0) {
        contenedor.innerHTML = '<p style="color: gray;">Sin comentarios aún.</p>';
        return;
      }

      contenedor.innerHTML = '';
      comentarios.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerHTML = `
          <p><strong>${c.nombre || 'Anónimo'}:</strong> ${c.contenido}</p>
          <small>🕒 ${c.fecha}</small>
        `;
        contenedor.appendChild(div);
      });
    } catch (error) {
      contenedor.innerHTML = '<p style="color: red;">Error al cargar comentarios.</p>';
    }
  }

  async function enviarComentario(e, libroId) {
    e.preventDefault();
    const usuarioId = localStorage.getItem('usuario_id');
    const textarea = e.target.querySelector('textarea');
    const contenido = textarea.value.trim();

    if (!usuarioId) {
      alert('⚠️ Debes iniciar sesión para comentar');
      return;
    }

    if (!contenido) return;

    try {
      const res = await fetch(`${API}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: parseInt(usuarioId),
          libro_id: libroId,
          contenido
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert('💬 Comentario enviado correctamente');
      textarea.value = '';
      toggleComentarios(libroId);
    } catch (error) {
      alert('❌ Error al enviar comentario');
      console.error(error);
    }
  }

  async function marcarFavorito(libroId) {
    const usuarioId = localStorage.getItem('usuario_id');
    if (!usuarioId) {
      alert('⚠️ Debes iniciar sesión para marcar favoritos');
      return;
    }

    try {
      const res = await fetch(`${API}/favoritos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: parseInt(usuarioId), libro_id: libroId })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert('📌 Libro marcado como favorito');
    } catch (error) {
      alert('❌ Error al marcar favorito');
    }
  }

  cargarLibros();
});
