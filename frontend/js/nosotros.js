document.addEventListener("DOMContentLoaded", function() {

    const containers = document.querySelectorAll('.grid-container .img-estilo');

    const imagenes = [
        'PuenteDeLaMujer.jpeg',
        '4sanRafel.jpg',
        'card3Cordoba.jpg',
        'footer.jpg',
    ];

    function obtenerImagenAleatoria() {
        const indice = Math.floor(Math.random() * imagenes.length);
        const imagen = imagenes.splice(indice, 1)[0];
        return imagen;
    }
    
    containers.forEach(container => {
        const imagenAleatoria = obtenerImagenAleatoria();
        container.style.backgroundImage = `url('img/${imagenAleatoria}')`;
        container.classList.add('img-estilo'); 
    });
});