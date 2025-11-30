document.addEventListener("DOMContentLoaded", () => {
    // IMÁGENES 
    const imagenes = [
        "../images/reformascasa.jpg",
        "../images/reformascocina.jpg",
        "../images/reformasparquet.jpg",
        "../images/climatizacion.jpg",
        "../images/reformasbano.jpg",
        "../images/interiorismo.jpg",
        "../images/rehabilitacionedificios.jpg",
        "../images/servicioshogar.jpg"
    ];

    // GENERAR GALERÍA 
    const galeria = document.getElementById("galeria");

    imagenes.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        galeria.appendChild(img);

        img.addEventListener("click", () => {
            abrirLightbox(src);
        });
    });

    // LIGHTBOX 
    const lightbox = document.getElementById("lightbox");
    const imgGrande = document.getElementById("imgGrande");

    function abrirLightbox(src) {
        imgGrande.src = src;
        lightbox.style.display = "flex";
    }

    // cerrar al hacer clic
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});
