document.addEventListener('DOMContentLoaded', () => {
    const btnConfig = document.querySelector('#config');

    btnConfig.addEventListener('click', () => window.location.href = "./config.html");
    const tablero = document.querySelector('.tablero');
    const timer = document.querySelector('#timer');
    const win = false; //aquí se guarda si el juego se ganó
    let time = 0;

    //variables para el cronometro
    let cronometroInterval = null;
    let segundosTranscurridos = 0;
    let juegoIniciado = false;

    genTablero();

    /*while(win === false){
        setTimeout(()=>{
            time++;
            timer.textContent = time;
        }, 1000);
    }*/

    function genTablero() {
        const cols = parseInt(localStorage.getItem('columnas')) || 8;
        const filas = parseInt(localStorage.getItem('filas')) || 8;
        const minas = parseInt(localStorage.getItem('minas')) || 8;

        const showMinas = document.querySelector("#nMinas");

        showMinas.textContent = minas;

        const coordenadas = [];

        //define las coordenadas de cada mina
        for (let i = 1; i <= minas; i++) {
            mina = `${Math.floor(Math.random() * cols) + 1}-${Math.floor(Math.random() * filas) + 1}`;
            if (!coordenadas.includes(mina)) {
                coordenadas[i] = mina;
            } else {
                i--;
                continue;
            }
        }

        //console.log(coordenadas);

        //generación de celdas
        for (let row = 1; row <= filas; row++) {
            const newRow = document.createElement('div');

            newRow.classList.add('row');

            for (let col = 1; col <= cols; col++) {
                const cell = document.createElement('div');
                cell.id = `${col}-${row}`
                cell.classList.add('celda', 'sin-revelar');
                //si la celda es incluida en las coordenadas de minas, su value es de mina o 0 por defecto
                cell.value = coordenadas.includes(cell.id) ? 'mina' : 0;

                if ((row + col) % 2 === 0) {
                    cell.classList.add('claro');
                } else {
                    cell.classList.add('oscuro');
                }

                cell.addEventListener('click', (e) => {
                    if (e.target.classList.value.includes('sin-revelar')) {
                        if(!juegoIniciado){
                            iniciarCronometro();
                        }
                        e.target.classList.remove('sin-revelar');
                        switch (e.target.value) {
                            case 'mina':
                                cell.classList.add('mina');
                                setTimeout(() => {
                                    alert('Perdiste, inténtalo otra vez');
                                    detenerCronometro();
                                    location.reload();
                                }, 100);
                                break;

                            case 0:
                                cell.classList.add('empty');

                                for (let x = col - 1; x <= col + 1; x++) {
                                    for (let y = row - 1; y <= row + 1; y++) {
                                        const id = `${x}-${y}`
                                        const celda = document.getElementById(id);

                                        if (celda !== null && celda.value !== 'mina' && celda.value !== 'banner' && celda.classList.value.includes('sin-revelar')) {
                                            celda.click();
                                        }
                                    }
                                }
                                break;

                            default:
                                const h2 = document.createElement('h2');
                                e.target.classList.add('cerca', `v${e.target.value}`);
                                h2.classList.add('valor');
                                h2.textContent = e.target.value;
                                e.target.appendChild(h2);
                                break;
                        }

                        const celdasOcultas = document.querySelectorAll('.sin-revelar');
                        const celdasMarcadas = document.querySelectorAll('.banner');
                        if (celdasOcultas.length + celdasMarcadas.length === minas) {
                            setTimeout(() => {
                                alert('Felicidades: Has Ganado');
                                detenerCronometro();
                                /*location.reload();*/
                            }, 100);
                        }
                    }
                })

                //click izquierdo / Marcar Mina
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();

                    celda = e.currentTarget;
                    const bannerCounter = parseInt(showMinas.textContent);
                    const clases = celda.classList.value;
                    if (clases.includes('sin-revelar') || clases.includes('banner')) {

                        if (clases.includes('sin-revelar')) {
                            celda.classList.remove('sin-revelar');
                            celda.classList.add('banner');
                            showMinas.textContent = `${bannerCounter - 1}${bannerCounter - 1 < 0 ? '?' : ''}`;

                            banner = document.createElement('img');
                            banner.src = "https://www.google.com/logos/fnbx/minesweeper/flag_icon.png";

                            celda.appendChild(banner);
                        } else {
                            celda.innerHTML = '';
                            celda.classList.remove('banner');
                            celda.classList.add('sin-revelar');
                            showMinas.textContent = `${bannerCounter + 1}${bannerCounter + 1 < 0 ? '?' : ''}`;
                        }
                    }

                })

                newRow.appendChild(cell);
            }
            tablero.appendChild(newRow);
        }

        valoresCeldas();

        function valoresCeldas() {
            for (let i = 0; i < coordenadas.length; i++) {
                let valor = String(coordenadas[i]).split('-');
                //ya que los valores vienen en string los convertimos en enteros para manejarlos mejor
                valor[0] = parseInt(valor[0]);
                valor[1] = parseInt(valor[1]);
                //console.log(valor);

                for (let x = valor[0] - 1; x <= valor[0] + 1; x++) {
                    for (let y = valor[1] - 1; y <= valor[1] + 1; y++) {
                        const id = `${x}-${y}`
                        const celda = document.getElementById(id);
                        if (celda !== null && celda.value !== 'mina') {
                            celda.value++;
                            /*celda.classList.add('cerca');
                            celda.innerHTML = `<h2 class="valor">${celda.value}</h2>`;*/
                        }
                    }
                }
            }
        }
    }

    // Función para iniciar el cronómetro
    function iniciarCronometro() {
        if (juegoIniciado) return; // evita reiniciar si ya inició
        juegoIniciado = true;

        cronometroInterval = setInterval(() => {
            segundosTranscurridos++;
            const minutos = Math.floor(segundosTranscurridos / 60).toString().padStart(2, '0');
            const segundos = (segundosTranscurridos % 60).toString().padStart(2, '0');
            document.getElementById('cronometro').textContent = `${minutos}:${segundos}`;
        }, 1000);
    }

    // Función para detener el cronómetro (llámala desde tu función de fin de juego)
    function detenerCronometro() {
        clearInterval(cronometroInterval);
    }

})