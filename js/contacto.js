document.addEventListener("DOMContentLoaded", () => {

    // Coordenadas del negocio
    const empresaLat = 40.436822;
    const empresaLng = -3.704453;

    let capaRuta = null; // para limpiar rutas anteriores

    // Inicializar mapa
    var mimapa = L.map('mapa').setView([empresaLat, empresaLng], 15);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(mimapa);

    // Marcador de la empresa
    L.marker([empresaLat, empresaLng]).addTo(mimapa)
        .bindPopup("Reformas FBH — Estamos aquí.")
        .openPopup();

    // Función para dibujar ruta
    async function calcularRuta(origenLat, origenLng) {
        const url = `https://router.project-osrm.org/route/v1/driving/${origenLng},${origenLat};${empresaLng},${empresaLat}?overview=full&geometries=geojson`;

        const resp = await fetch(url);
        const data = await resp.json();

        if (!data.routes || data.routes.length === 0) {
            alert("No se pudo calcular la ruta.");
            return;
        }

        const ruta = data.routes[0];

        if (capaRuta) {
            mimapa.removeLayer(capaRuta);
        }

        capaRuta = L.geoJSON(ruta.geometry, {
            style: { color: "red", weight: 4 }
        }).addTo(mimapa);

        mimapa.fitBounds([
            [origenLat, origenLng],
            [empresaLat, empresaLng]
        ]);

        const distanciaKm = (ruta.distance / 1000).toFixed(2);
        const duracionMin = Math.round(ruta.duration / 60);

        document.getElementById("infoRuta").textContent =
            `Distancia: ${distanciaKm} km — Tiempo estimado: ${duracionMin} minutos`;
    }

    // Ruta desde clic en el mapa
    mimapa.on("click", function (e) {
        const { lat, lng } = e.latlng;
        calcularRuta(lat, lng);
    });

    // Botón: ruta desde mi ubicación
    const btnUbicacion = document.getElementById("btnMiUbicacion");
    btnUbicacion.addEventListener("click", function () {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (pos) {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                calcularRuta(lat, lng);
            },
            function () {
                alert("No se pudo obtener tu ubicación.");
            }
        );
    });

});
