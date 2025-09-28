const API = 'http://localhost:3000/api/libros';

const libros = [
  {
    usuario_id: 1,
    titulo: "El jardín secreto",
    autor: "Frances Hodgson Burnett",
    categoria: "Principiante",
    portada: "imagenes/jardinsecreto.jpg",
    pdf_url: "Libros/El jardín secreto .pdf",
    resumen: "Una niña descubre un jardín oculto que transforma su vida."
  },
  {
    usuario_id: 1,
    titulo: "El sabueso de los Baskerville",
    autor: "Arthur Conan Doyle",
    categoria: "Principiante",
    portada: "imagenes/El saueso de los Baskerville.jpg",
    pdf_url: "Libros/El sabueso de los Baskerville .pdf",
    resumen: "Sherlock Holmes investiga una leyenda aterradora en los páramos."
  },
  {
    usuario_id: 1,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Principiante",
    portada: "imagenes/El Principito.jpg",
    pdf_url: "Libros/El Principito -- Antoine de Saint-Exupéry.pdf",
    resumen: "Un viaje poético sobre la infancia, el amor y la imaginación."
  },
  {
    usuario_id: 1,
    titulo: "Doña Bárbara",
    autor: "Rómulo Gallegos",
    categoria: "Principiante",
    portada: "imagenes/Doña Bárbara.jpg",
    pdf_url: "Libros/Doña Bárbara (Spanish Edition) .pdf",
    resumen: "Conflicto entre civilización y barbarie en los llanos venezolanos."
  },
  {
    usuario_id: 1,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    categoria: "Avanzado",
    portada: "imagenes/Orgullo_y_prejui.jpg",
    pdf_url: "Libros/Orgullo_y_prejuicio-Jane_Austen.pdf",
    resumen: "Una historia de amor y clases sociales en la Inglaterra del siglo XIX."
  },
  {
    usuario_id: 1,
    titulo: "Cumbres Borrascosas",
    autor: "Emily Brontë",
    categoria: "Avanzado",
    portada: "imagenes/Cumbreborosas.jpg",
    pdf_url: "Libros/Cumbres Borrascosas -- Emily Bront.pdf",
    resumen: "Pasión y venganza en los páramos ingleses."
  },
  {
    usuario_id: 1,
    titulo: "La letra escarlata",
    autor: "Nathaniel Hawthorne",
    categoria: "Avanzado",
    portada: "imagenes/la letra escarlata.jpg",
    pdf_url: "Libros/La letra escarlata -- Nathaniel Hawthorne .pdf",
    resumen: "Una mujer marcada por el pecado en la Nueva Inglaterra puritana."
  },
  {
    usuario_id: 1,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoyevski",
    categoria: "Avanzado",
    portada: "imagenes/Crimen y castigo.jpg",
    pdf_url: "Libros/Crimen y castigo -- Fiódor Dostoyevski .pdf",
    resumen: "Un joven comete un crimen y enfrenta su conciencia."
  },
  {
    usuario_id: 1,
    titulo: "La Regenta",
    autor: "Leopoldo Alas 'Clarín'",
    categoria: "Avanzado",
    portada: "imagenes/La Regente.jpg",
    pdf_url: "Libros/",
    resumen: "Crítica social y religiosa en la España del siglo XIX."
  },
  {
    usuario_id: 1,
    titulo: "Don Quijote De La Mancha",
    autor: "Miguel de Cervantes",
    categoria: "Profecionales",
    portada: "imagenes/Don Quijote De La Mancha.jpg",
    pdf_url: "Libros/Don Quijote De La Mancha -- Lincoln R_ Maiztegui Casas, Miguel de Cervantes Saavedra .pdf",
    resumen: "El caballero de la triste figura y su lucha contra molinos de viento."
  },
  {
    usuario_id: 1,
    titulo: "Historia interminable",
    autor: "Michael Ende",
    categoria: "Profecionales",
    portada: "imagenes/Historia interminable.jpg",
    pdf_url: "Libros/Historia interminable, La -- ENDE, MICHAEL -- 2015-06-26.pdf",
    resumen: "Un niño entra en un mundo mágico a través de un libro."
  },
  {
    usuario_id: 1,
    titulo: "Sentido y sensibilidad",
    autor: "Jane Austen",
    categoria: "Profecionales",
    portada: "imagenes/Sentido y sensibilidad.jpg",
    pdf_url: "Libros/Sentido y sensibilidad -- Jane Austen .pdf",
    resumen: "Dos hermanas enfrentan el amor y la pérdida en la Inglaterra del siglo XIX."
  }
];

async function insertarLibros() {
  for (const libro of libros) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      });

      const data = await res.json();
      console.log(`✅ Insertado: ${libro.titulo} → ID ${data.id || 'desconocido'}`);
    } catch (error) {
      console.error(`❌ Error al insertar ${libro.titulo}:`, error.message);
    }
  }
}

insertarLibros();
