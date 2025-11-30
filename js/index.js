// Cargar noticias desde un archivo JSON externo
fetch('noticias.json')
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById('contenedor-noticias');
        contenedor.innerHTML = '';

        data.noticias.forEach(noticia => {
            const div = document.createElement('div');
            div.className = 'noticia';
            div.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
                <strong>Válido hasta: ${noticia.fecha}</strong>
            `;
            contenedor.appendChild(div);
        });
    })
    .catch(error => {
        document.getElementById('contenedor-noticias').innerHTML = '<p>No se pudieron cargar las noticias.</p>';
        console.error('Error cargando noticias:', error);
    });