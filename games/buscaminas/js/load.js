document.addEventListener('DOMContentLoaded', () => {
    const btnConfig = document.querySelector('#config');

    btnConfig.addEventListener('click', () => window.location.href = "./config.html");
    const tablero = document.querySelector('.tablero');
    const timer = document.querySelector('#timer');
    let win = null; //aquí se guarda si el juego se ganó
    let time = 0, delay = 0;

    //variables para el cronometro
    let cronometroInterval = null;
    let segundosTranscurridos = 0;
    let juegoIniciado = false;

    const cols = parseInt(localStorage.getItem('columnas')) || 8;
    const filas = parseInt(localStorage.getItem('filas')) || 8;
    const minas = parseInt(localStorage.getItem('minas')) || 8;

    genTablero();

    function genTablero() {

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
                    if (e.target.classList.value.includes('sin-revelar') && win !== false) {
                        if (!juegoIniciado) {
                            iniciarCronometro();
                        }
                        e.target.classList.remove('sin-revelar');
                        switch (e.target.value) {
                            case 'mina':
                                explotaMina(e.target.id);
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
                                //const h2 = document.createElement('img');
                                e.target.classList.add('cerca', `v${e.target.value}`);
                                h2.classList.add('valor');
                                h2.textContent = e.target.value;

                                /*h2.src = `../src/img/numbers/${e.target.value}.png`;*/
                                ajustarTextoCeldas();
                                e.target.appendChild(h2);
                                break;
                        }

                        const celdasOcultas = [...document.querySelectorAll('.sin-revelar'), ...document.querySelectorAll('.banner')];
                        const minasOcultas = [...celdasOcultas.filter(celda => celda.value === 'mina')];//filtra las minas en las celdas ocultas o marcadas

                        if (minasOcultas.length === celdasOcultas.length && win !== true) {
                            win = true;
                            juegoTerminado();
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
                            banner.src = "../src/img/red_flag_icon.png";

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

        function explotaMina(celdaId) {

            const booms = [celdaId, ...coordenadas.filter(id => id !== celdaId)]
            const maxDelay = 250, minDelay = 80;
            const maxMines = 172, minMines = 8;
            const delayAdd = maxDelay - (maxDelay - minDelay) / (maxMines - minMines) * (minas - minMines);//para que todas las minas exploten en un tiempo máximo

            booms.forEach(celda => {
                const cell = document.getElementById(celda);
                setTimeout(() => {
                    cell.innerHTML = '';
                    const audio = new Audio('../src/sonidos/explosion.mp3');
                    audio.play();
                    const bomb = document.createElement('img');
                    bomb.src = '../src/img/bomb-icon.png'
                    cell.appendChild(bomb);
                    cell.classList.add('exploding');
                }, delay);
                delay += delayAdd;
            })
            win = false;
            juegoTerminado();
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

    function juegoTerminado() {
        clearInterval(cronometroInterval);

        setTimeout(() => {
            if (win) {
                const celdas = [...document.querySelectorAll('.sin-revelar'), ...document.querySelectorAll('.banner')]
                celdas.forEach(celda => {
                    if (celda.value === 'mina') {
                        celda.innerHTML = '';
                        celda.classList.add('banner');
                        const img = document.createElement('img');
                        img.src = '../src/img/bomb-icon.png';
                        celda.appendChild(img);
                    }
                });

            }
            mensajeBox(win);
        }, delay + (win ? 100 : 1000));
    }

    function mensajeBox(win) {
        const body = document.querySelector('body');

        const container = document.createElement('div');
        const box = document.createElement('div');
        const h2 = document.createElement('h2');
        const btnRetry = document.createElement('button');
        const div = document.createElement('div');

        container.classList.add('msjBox-container');
        box.classList.add('msjBox-display');
        btnRetry.textContent = 'Jugar Otra Vez';
        btnRetry.addEventListener('click', () => {
            location.reload();
        })

        box.appendChild(h2);
        if (win) {
            function scoreRow(scoreLabel, puntos){
                const div = document.createElement('div');
                const label = document.createElement('h3');
                const score = document.createElement('h3');

                div.classList.add('score-row');
                label.textContent = scoreLabel;
                score.textContent = puntos;

                div.appendChild(label);
                div.appendChild(score);

                return div;
            }

            box.classList.add('win');
            h2.textContent = 'Felicidades, Has Ganado';

            //pontajes
            const puntosTablero = cols * filas * 10;
            const puntosMinas = minas * 100;
            const puntosTiempo = Math.floor((minas*15 / segundosTranscurridos));
            const puntos = (puntosTablero+puntosMinas)*puntosTiempo;

            box.appendChild(scoreRow(`Tablero ${cols} x ${filas}:`, `${puntosTablero} pts`));
            box.appendChild(scoreRow(`Minas ${minas}:`, `${puntosMinas} pts`));
            box.appendChild(scoreRow(`Bonus por Tiempo:`, `x${puntosTiempo}`));
            box.appendChild(scoreRow(`Puntuación Final:`, `${puntos} pts`));

            /*//siguiente Nivel
            const btnNext = document.createElement('button');*/
        } else {
            box.classList.add('lose');
            h2.textContent = 'Lo siento, Perdiste';
        }

        body.appendChild(container);
        container.appendChild(box);
        div.appendChild(btnRetry);
        box.appendChild(div);
    }

    function ajustarTextoCeldas() {
        const celdas = document.querySelectorAll('.cerca');

        celdas.forEach((celda) => {
            const referencia = document.querySelector('.sin-revelar') !== null ? document.querySelector('.sin-revelar') : document.querySelector('.empty')
            const size = referencia.offsetHeight
            //console.log(size);

            celda.style.fontSize = size * 0.45 + 'px';
        })
    }
    //window.addEventListener('load', ()=>ajustarTextoCeldas());
    window.addEventListener('resize', () => ajustarTextoCeldas());
})
