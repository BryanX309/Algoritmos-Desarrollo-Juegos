document.addEventListener('DOMContentLoaded', ()=>{

    const minCeldas = 8, maxCeldas=24;

    const inputs = document.querySelectorAll('input');
    const btnGuardar = document.querySelector('#guardar');
    const btnCancelar = document.querySelector('#cancelar');
    const cols = document.querySelector('#columnas');
    const filas = document.querySelector('#filas');
    const minas = document.querySelector('#minas');
    const card = document.querySelector('.card');

    cargar();

    inputs.forEach((input)=>{
        input.addEventListener('keypress',(e)=>{
            if(e.key === '.' ||e.key === ','){
                e.preventDefault();
            }
        });

        input.addEventListener('input',(e)=>e.preventDefault());
    })

    function cargar(){
        cols.value = localStorage.getItem('columnas') || 8;
        filas.value = localStorage.getItem('filas') || 8;
        minas.value = localStorage.getItem('minas') || 8;
    }

    function validar(){
        const celdas = cols.value * filas.value;

        if(cols.value === ''){
            showAlert('El Campo de Columnas no puede estar vació');
            return false;
        }

        if(cols.value < minCeldas || cols.value > maxCeldas){
            showAlert(`Las Columnas tienen que ser de ${minCeldas} a ${maxCeldas}`);
            return false;
        
        }
        if(filas.value === ''){
            showAlert('El Campo de Filas no puede estar vació');
            return false;
        }

        if(filas.value < minCeldas || filas.value > maxCeldas){
            showAlert(`Las Filas tienen que ser de ${minCeldas} a ${maxCeldas}`);
            return false;
        }

        if(minas.value < celdas*0.1){
            showAlert(`Las minas que quieres usar son menores al 10% de las ${cols.value * filas.value} celdas con las que quieres jugar`);
            return false;
        }

        if(minas.value > celdas*0.3){
            showAlert(`Las minas que quieres usar son mayores al 30% de las ${cols.value * filas.value} celdas con las que quieres jugar`);
            return false;
        }

        return true;
    }

    function showAlert(msg = 'Texto de Alerta'){
        /*
        <div class="flex">
            <div class="alerta">
                <div class="alert-header"><button>x</button></div>
                <p>Alerta</p>
            </div>
        </div>
        */

        card.lastChild.remove;
        
        const flex = document.createElement('div');
        const alerta = document.createElement('div');
        const header = document.createElement('div');
        const title = document.createElement('h3');
        const btnCerrar = document.createElement('button');
        const text = document.createElement('p');

        flex.classList.add('flex');
        flex.id = 'alerta';
        alerta.classList.add('alerta');
        header.classList.add('alert-header');
        btnCerrar.textContent = 'x';
        text.textContent = msg;
        title.textContent = 'Alerta';

        card.appendChild(flex);
        flex.appendChild(alerta);
        alerta.appendChild(header);
        alerta.appendChild(text);
        header.appendChild(title);
        header.appendChild(btnCerrar);

        btnCerrar.addEventListener('click', () => {
            card.lastChild.remove();
        })
    }

    btnGuardar.addEventListener('click',()=>{
        if(validar()){
            localStorage.setItem('columnas', cols.value);
            localStorage.setItem('filas',filas.value);
            localStorage.setItem('minas',minas.value);

            window.location.href = "../../pages/buscaminas/tablero.html";
        }
    })

    btnCancelar.addEventListener('click', ()=> window.location.href = "../../pages/buscaminas/tablero.html");
})