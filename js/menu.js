document.addEventListener('DOMContentLoaded',()=>{

    const buscaminas = document.querySelector('#buscaminas');
    const ahorcado = document.querySelector('#ahorcado');

    buscaminas.addEventListener('click', () => window.location.href = "../games/buscaminas/pages/tablero.html");
    ahorcado.addEventListener('click', () => window.location.href = "../games/ahorcado/pages/tablero.html");
    //aquí cambia la dirección del archivo del ahorcado
})