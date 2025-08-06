document.addEventListener('DOMContentLoaded', () => {
    const tabla = JSON.parse(localStorage.getItem('BM-registro'));
    const container = document.querySelector('.registro-table');
    const btnBorrar = document.querySelector('#borrar-reg');

    addRow('TABLERO', 'MINAS', 'TIEMPO', 'PUNTAJE');
    container.children[0].classList.add('headers');

    console.log(tabla);
    
    if(tabla !== null){
        tabla.forEach(r => {        
        addRow(r.tablero, r.minas, r.tiempo, r.score);
        });
    }else{
        const h4 = document.createElement('h3');
        const row = document.createElement('div');

        //row.classList.add('registro-row');

        h4.textContent = 'No Hay Partidas Registradas';

        row.appendChild(h4);
        container.appendChild(row);
    }
    
    function addRow(tablero, minas, tiempo, score){
        const tableroShow = document.createElement('h4');
        const minasShow = document.createElement('h4');
        const tiempoShow = document.createElement('h4');
        const scoreShow = document.createElement('h4');
        const row = document.createElement('div');

        tableroShow.textContent = tablero;
        minasShow.textContent = minas;
        tiempoShow.textContent = tiempo;
        scoreShow.textContent = score;

        row.classList.add('registro-row');

        row.appendChild(tableroShow);
        row.appendChild(minasShow);
        row.appendChild(tiempoShow);
        row.appendChild(scoreShow);

        container.appendChild(row);
    }

    btnBorrar.addEventListener('click', ()=>{
        if(window.confirm('Esta Seguro que quiere eliminar todos los registros?\nEsta Acción no se puede deshacer')){
            localStorage.removeItem('BM-registro');
            localStorage.removeItem('BMHighScore');
            location.reload();
        }
    })
});