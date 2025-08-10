document.addEventListener('DOMContentLoaded', () => {
    const btnConfig = document.querySelector('#config');
    const btnSonido = document.querySelector('#sonido');
    const btnRegistro = document.querySelector('#registro');

    const body = document.querySelector('body');

    const tablero = document.querySelector('.tablero');
    let win = null; //aquí se guarda si el juego se ganó
    let delay = 0, bodyClick = false;

    //variables para el cronometro
    let cronometroInterval = null;
    let segundosTranscurridos = 0;
    let juegoIniciado = false;

    const cols = parseInt(localStorage.getItem('columnas')) || 8;
    const filas = parseInt(localStorage.getItem('filas')) || 8;
    const minas = parseInt(localStorage.getItem('minas')) || 8;

    let sonido = JSON.parse(localStorage.getItem('sonido'));

    sonido = sonido !== null ? sonido : true // define como true el valor por defecto
    // se hace asi porque || funciona como operador O y si en localStorage es falso queda (falso o verdadero) = verdadero

    btnSonido.value = sonido;
    cargarBtnSonido(sonido)

    body.addEventListener('click', () => {
        if (win !== null) {
            if (bodyClick) {
                mensajeBox(win);
            } else {
                bodyClick = true; //el mensaje aparecerá solo si es el segundo click en el body
            }
        }
    })

    function cargarBtnSonido(booleano) {
        btnSonido.src = `../src/img/icons/volume-${booleano ? 'on' : 'off'}-icon.svg`;
        btnSonido.title = booleano ? 'Sonido: Habilitado' : 'Sonido: Deshabilitado';
    }

    btnConfig.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "./config.html";
    });

    btnSonido.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sonido = !sonido;
        e.target.value = sonido;
        localStorage.setItem('sonido', sonido);

        cargarBtnSonido(sonido);
    })

    btnRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "./registro.html";
    });

    genTablero();

    function genTablero() {

        const flagsCounter = document.querySelector("#flagCounter");

        flagsCounter.textContent = minas;

        const coordenadas = [];

        //define las coordenadas de cada mina
        for (let i = 0; i < minas; i++) {
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
            newRow.addEventListener('contextmenu', (e) => e.preventDefault());

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

                //Click Izquierdo / Revelar Celda
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

                                        if (celda !== null &&
                                            celda.value !== 'mina') {
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

                                ajustarTextoCeldas();
                                e.target.appendChild(h2);
                                break;
                        }

                        const celdasOcultas = [
                            ...document.querySelectorAll('.sin-revelar'),
                            ...document.querySelectorAll('.flag')
                        ];

                        const minasOcultas =
                            [...celdasOcultas.filter(celda => celda.value === 'mina')];
                        //filtra las minas en las celdas ocultas o marcadas

                        if (minasOcultas.length === celdasOcultas.length && !win) {
                            win = true;
                            juegoTerminado();
                        }
                    }
                })

                //click Derecho / Marcar Celda
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();

                    celda = e.currentTarget;
                    const fCount = parseInt(flagsCounter.textContent);
                    const clases = celda.classList.value;

                    if (clases.includes('sin-revelar') || clases.includes('flag')) {

                        if (clases.includes('sin-revelar')) {
                            celda.classList.remove('sin-revelar');
                            celda.classList.add('flag');
                            flagsCounter.textContent = `${fCount - 1}${fCount - 1 < 0 ? '?' : ''}`;

                            const flag = document.createElement('img');
                            flag.src = "../src/img/red_flag_icon.png";

                            celda.appendChild(flag);
                        } else {
                            celda.innerHTML = '';
                            celda.classList.remove('flag');
                            celda.classList.add('sin-revelar');
                            flagsCounter.textContent = `${fCount + 1}${fCount + 1 < 0 ? '?' : ''}`;
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

                for (let x = valor[0] - 1; x <= valor[0] + 1; x++) {
                    for (let y = valor[1] - 1; y <= valor[1] + 1; y++) {
                        const id = `${x}-${y}`
                        const celda = document.getElementById(id);
                        if (celda !== null && celda.value !== 'mina') {
                            celda.value++;
                        }
                    }
                }
            }
        }

        function explotaMina(celdaId) {
            win = false;

            const [colIni, filaIni] = celdaId.split("-").map(Number);

            //se ordenan las minas conforme que tan cerca están de la mina inicial
            coordenadas.sort((a, b) => {
                const [colA, filaA] = a.split("-").map(Number);
                const [colB, filaB] = b.split("-").map(Number);

                // Calcular distancia de la celda inicial
                const distA = Math.sqrt((colA - colIni) ** 2 + (filaA - filaIni) ** 2);
                const distB = Math.sqrt((colB - colIni) ** 2 + (filaB - filaIni) ** 2);

                return distA - distB;
            });

            const maxDelay = 250, minDelay = 80;
            const maxMines = 172, minMines = 8;
            const delayAdd =
                maxDelay - (maxDelay - minDelay) / (maxMines - minMines) * (minas - minMines);
            //para que todas las minas exploten en un tiempo máximo

            coordenadas.forEach(celda => {
                const cell = document.getElementById(celda);
                setTimeout(() => {
                    cell.innerHTML = '';
                    if (sonido) {
                        const audio = new Audio('../src/sonidos/explosion.mp3');
                        audio.play();
                    }
                    const bomb = document.createElement('img');
                    bomb.src = '../src/img/bomb-icon.png'
                    cell.appendChild(bomb);
                    cell.classList.add('exploding');
                }, delay);
                delay += delayAdd;
            })
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
        juegoIniciado = false;
        clearInterval(cronometroInterval);
        setTimeout(() => mensajeBox(win), delay + 1000);

        if (win) {
            const celdas = [...document.querySelectorAll('.sin-revelar'), ...document.querySelectorAll('.flag')]
            celdas.forEach(celda => {
                if (celda.value === 'mina') {
                    celda.innerHTML = '';
                    celda.classList.add('flag');
                    const img = document.createElement('img');
                    img.src = '../src/img/bomb-icon.png';
                    celda.appendChild(img);
                }
            });
        }
    }

    function mensajeBox(win) {
        sonido = false;
        if (document.querySelector('.msjBox-container') !== null) {
            return;
        }

        const container = document.createElement('div');
        const box = document.createElement('div');
        const header = document.createElement('h2');
        const btnRetry = document.createElement('button');
        const div = document.createElement('div');

        container.classList.add('msjBox-container');
        box.classList.add('msjBox-display');
        btnRetry.textContent = 'Jugar Otra Vez';
        btnRetry.addEventListener('click', () => {
            location.reload();
        })

        box.appendChild(header);
        //contenido de mensajeBox dependiendo de win
        if (win) {
            function scoreRow(scoreLabel, puntos) {
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
            header.textContent = 'Felicidades, Has Ganado';

            //puntajes
            const puntosTablero = cols * filas * 10;
            const puntosMinas = minas * 100;
            const puntosTiempo = 1 + Math.floor((minas * 15 / segundosTranscurridos));
            const puntos = (puntosTablero + puntosMinas) * puntosTiempo;

            //agregar victoria al Registro
            let registro = JSON.parse(localStorage.getItem('BM-registro')) || [];
            const partida = {
                tablero: `${cols} x ${filas}`,
                minas: minas,
                tiempo: document.querySelector('#cronometro').textContent,
                score: puntos
            }

            registro = [...registro, partida];

            console.log(registro);


            registro.sort((a, b) => b.score - a.score);

            localStorage.setItem('BM-registro', JSON.stringify(registro));

            //Nueva Puntuación maxima
            const record = parseInt(localStorage.getItem('BMHighScore')) || 0;
            if (puntos > record) {
                const msgSpecial = document.createElement('h2');
                msgSpecial.textContent = '¡Mejor Puntaje!';
                box.appendChild(msgSpecial);

                localStorage.setItem('BMHighScore', puntos);
            }

            //Tablero de Puntos
            box.appendChild(scoreRow(`Tablero ${cols} x ${filas}:`, `${puntosTablero} pts`));
            box.appendChild(scoreRow(`Minas ${minas}:`, `${puntosMinas} pts`));
            box.appendChild(scoreRow(`Bonus por Tiempo:`, `x${puntosTiempo}`));
            box.appendChild(scoreRow(`Puntuación Final:`, `${puntos} pts`));

        } else {
            box.classList.add('lose');
            header.textContent = 'Lo siento, Perdiste';
        }

        body.appendChild(container);
        container.appendChild(box);
        div.appendChild(btnRetry);
        box.appendChild(div);
    }

    function ajustarTextoCeldas() {
        const celdas = document.querySelectorAll('.cerca');
        celdas.forEach((celda) => {
            const ref =
                document.querySelector('.sin-revelar') ||
                document.querySelector('.flag') ||
                document.querySelector('.empty');
            //se consigue cualquier celda que no sea numérica para tomarla de referencia
            const size = ref.offsetHeight

            celda.style.fontSize = size * 0.45 + 'px';
        })
    }

    //funciones de la pantalla
    window.addEventListener('resize', () => ajustarTextoCeldas());
    window.addEventListener("beforeunload", function (e) {
        if (juegoIniciado && win === null) {
            e.preventDefault();
            e.returnValue = ""; // Requerido en la mayoría de navegadores
        }
    });
})
