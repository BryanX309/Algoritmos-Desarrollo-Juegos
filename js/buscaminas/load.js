document.addEventListener('DOMContentLoaded', () => {
    const btnConfig = document.querySelector('#config');

    btnConfig.addEventListener('click', ()=>window.location.href = "./config.html");
    const tablero = document.querySelector('.tablero');    

    genTablero();

    function genTablero(){
        const cols = parseInt(localStorage.getItem('columnas')) || 8;
        const filas = parseInt(localStorage.getItem('filas')) || 8;
        const minas = parseInt(localStorage.getItem('minas')) || 8;
        
        const showMinas = document.querySelector("#nMinas");

        showMinas.textContent = minas;

        const coordenadas = [];

        //define las coordenadas de cada mina
        for (let i = 1; i <= minas; i++) {
            mina = `${Math.floor(Math.random() * cols)+1}-${Math.floor(Math.random() * filas)+1}`;
            if(!coordenadas.includes(mina)){
                coordenadas[i] = mina;
            }else{
                i--;
                continue;
            }
        }

        //console.log(coordenadas);

        //generación de celdas
        for (let row = 1; row <= filas; row++) {
            const newRow = document.createElement('div');

            newRow.classList.add('row');

            for (let col = 1; col <=cols; col++){
                const cell = document.createElement('div');
                cell.id = `${col}-${row}`
                cell.value = 0;
                cell.classList.add('celda');
                
                if(coordenadas.includes(cell.id)){
                    //cell.classList.add('mina');
                    cell.value = 'mina';
                }/*else{
                    cell.classList.add('sin-revelar');
                }*/
                cell.classList.add('sin-revelar');

                cell.addEventListener('click', (e)=>{
                    if(e.target.classList.value.includes('sin-revelar')){
                        e.target.classList.remove('sin-revelar');
                        switch (e.target.value) {
                            case 'mina':
                                cell.classList.add('mina');    
                                setTimeout(()=>{
                                    alert('Perdiste, inténtalo otra vez');
                                    location.reload();
                                },100);
                                break;
    
                            case 0:
                                cell.classList.add('empty');

                                /*celdaClick(col, row-1);// misma columna fila de arriba
                                celdaClick(col, row+1);// misma columna fila de Abajo
                                celdaClick(col-1, row);// misma fila Columna Anterior
                                celdaClick(col+1, row);// misma fila Columna Siguiente
                                
                                function celdaClick(x, y){ // ejecuta el evento Click de la celda según su coordenada
                                    const id=`${x}-${y}`
                                    const celda = document.getElementById(id);
    
                                    if(celda !== null && celda.value !== 'mina'&& celda.value !== 'banner'&&celda.classList.value.includes('sin-revelar')){
                                        //console.log(celda);
                                        celda.click();
                                    }
                                }*/

                                for (let x = col-1; x <= col+1; x++) {
                                    for (let y = row-1; y <=row+1; y++) {
                                        const id=`${x}-${y}`
                                        const celda = document.getElementById(id);
    
                                        if(celda !== null && celda.value !== 'mina'&& celda.value !== 'banner'&&celda.classList.value.includes('sin-revelar')){
                                            //console.log(celda);
                                            celda.click();
                                        }
                                    }
                                }
                                break;
                        
                            default:
                                const h2 = document.createElement('h2');
                                e.target.classList.add('cerca');
                                h2.classList.add('valor');
                                h2.textContent = e.target.value;
                                e.target.appendChild(h2);
                                break;
                        }

                        const celdasOcultas = document.querySelectorAll('.sin-revelar');
                        const celdasMarcadas = document.querySelectorAll('.banner');
                        if(celdasOcultas.length+celdasMarcadas.length === minas){
                            setTimeout(()=>{
                                    alert('Felicidades: Has Ganado');
                                    /*location.reload();*/
                                },100);
                        }
                        
                    }
                })

                //click izquierdo / Marcar Mina
                cell.addEventListener('contextmenu', (e)=>{
                    e.preventDefault();
                    console.log(e);
                    
                    celda = e.currentTarget;
                    const bannerCounter = parseInt(showMinas.textContent);
                    const clases = celda.classList.value;

                    if(clases.includes('sin-revelar')){
                        celda.classList.remove('sin-revelar');
                        celda.classList.add('banner');
                        showMinas.textContent = `${bannerCounter-1}${bannerCounter-1<0 ? '?':''}`;
                        
                        banner = document.createElement('img');
                        banner.src = "https://www.google.com/logos/fnbx/minesweeper/flag_icon.png";

                        celda.appendChild(banner);
                    }else{
                        celda.innerHTML = '';
                        celda.classList.remove('banner');
                        celda.classList.add('sin-revelar');
                        showMinas.textContent = `${bannerCounter+1}${bannerCounter+1<0 ? '?':''}`;
                    }
                })

                newRow.appendChild(cell);
            }
            tablero.appendChild(newRow);
        }

        valoresCeldas();

        function valoresCeldas(){
            for (let i = 0; i < coordenadas.length; i++) {
                let valor = String(coordenadas[i]).split('-');
                //ya que los valores vienen en string los convertimos en enteros para manejarlos mejor
                valor[0] = parseInt(valor[0]);
                valor[1] = parseInt(valor[1]);
                //console.log(valor);
                
                for (let x = valor[0]-1; x <= valor[0]+1; x++) {
                    for (let y = valor[1]-1; y <= valor[1]+1; y++) {
                        const id=`${x}-${y}`
                        const celda = document.getElementById(id);
                        if(celda !==null && celda.value !=='mina'){
                            celda.value++;
                            /*celda.classList.add('cerca');
                            celda.innerHTML = `<h2 class="valor">${celda.value}</h2>`;*/
                        }
                    }
                }
            }
        }
    }
})