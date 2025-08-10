// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    // =============================================
    // LISTAS DE PALABRAS POR DIFICULTAD
    // =============================================
    
    // Palabras para el nivel fácil (3-5 letras)
    const palabrasFaciles = [
      'SOL', 'AGUA', 'LUNA', 'CASA', 'PERRO', 'GATO', 'FLOR', 'PAN', 'PATO', 'RIO',
      'RED', 'PIE', 'OSO', 'SAL', 'MAR', 'OLA', 'PALO', 'RATON', 'PELO', 'LUZ',
      'DOS', 'TRES', 'COPA', 'PAPA', 'MESA', 'SILLA', 'CAMA', 'VINO', 'QUESO', 'ARROZ',
      'PESO', 'DIA', 'NOCHE', 'CIELO', 'NUBE', 'HOJA', 'PIEL', 'HUESO', 'PUNTO', 'LINEA',
      'CARA', 'MANO', 'PIES', 'OJOS', 'BOCA', 'NARIZ', 'OREJA', 'PELO', 'UÑA', 'LABIO',
      'REY', 'REINA', 'CABALLO', 'TORO', 'CABRA', 'OVEJA', 'GALLO', 'POLLO', 'PEZ', 'JAZZ', 'YOGUR', 'RANA'
    ];
    
    // Palabras para el nivel medio (6-10 letras)
    const palabrasMedias = [
      'ELEFANTE', 'JIRAFA', 'TORTUGA', 'LEOPARDO', 'CANGURO', 'MURCIELAGO', 'CEBRA', 'DELFIN', 'TIBURON', 'ARDILLA', 'KIWI', 
      'BICICLETA', 'AUTOMOVIL', 'TELEVISION', 'COMPUTADORA', 'REFRIGERADOR', 'VENTILADOR', 'PARAGUAS', 'TELEFONO', 'CAMARA', 'RELOJ',
      'ESCUELA', 'HOSPITAL', 'BIBLIOTECA', 'RESTAURANTE', 'SUPERMERCADO', 'AEROPUERTO', 'ESTACION', 'FARMACIA', 'TIENDA', 'GIMNASIO',
      'JARDINERO', 'DOCTOR', 'INGENIERO', 'MAESTRO', 'POLICIA', 'BOMBERO', 'CARPINTERO', 'PINTOR', 'MUSICO', 'CHEF',
      'CHOCOLATE', 'HELADO', 'GALLETA', 'PASTEL', 'CARAMELO', 'PANQUEQUE', 'ENSALADA', 'SANDWICH', 'HAMBURGUESA', 'PIZZA',
      'GLOBOS', 'REGALO', 'VELAS', 'TARJETA', 'FIESTA', 'JUEGO', 'CANCION', 'BAILE', 'VIAJE', 'AVENTURA'
    ];
    
    // Palabras para el nivel difícil (11+ letras, palabras complejas)
    const palabrasDificiles = [
      'QUIMIOTERAPIA', 'BIOQUIMICA', 'ASTROFISICA', 'GEOMETRICO', 'TRIGONOMETRIA', 
      'ALGORITMO', 'CALCULADORA', 'ESTADISTICA', 'FISICOCULTURISTA', 'METAFORICO',
      'ELECTROMAGNETISMO', 'DESOXIRRIBOSA', 'PARALELOGRAMO', 'OTORRINOLARINGOLOGO', 'ELECTROENCEFALOGRAMA', 
      'INCONSTITUCIONAL', 'INTERDISCIPLINARIO', 'ANTICONSTITUCIONAL', 'DESPROPORCIONADO', 'HIPERACTIVIDAD',
      'CRIPTOGRAFIA', 'PALEONTOLOGIA', 'ARQUEOLOGICO', 'ANTROPOLOGICO', 'PSICOMETRIA',
      'ESQUIZOIDE', 'HIPERBOLICO', 'PSEUDOCIENTIFICO', 'XENOFOBIA', 'QUETZALCOATL',
      'ZOOLOGICO', 'BOTANICO', 'CROMOSOMICO', 'MITOCONDRIAL', 'CLOROFILICO',
      'RIBOSOMICO', 'LISOSOMAL', 'CITOPLASMATICO', 'NUCLEOTIDO', 'CENTRIFUGA',
      'VACUNACION', 'MEMBRANOSO', 'EXTRATERRESTRE', 'CALEIDOSCOPICO', 'PSICODELICO',
      'QUINQUENIO', 'EXHIBICIONISTA', 'KARATEKA', 'YACIMIENTO', 'ZODIACAL',
      'QUINUA', 'JAZMIN', 'KILOBYTE', 'WATERPOLISTA', 'XILOGRAFIA'
    ];
    
    // =============================================
    // CONFIGURACIÓN DEL TECLADO
    // =============================================
    const ordenTeclasF1 = 'QWERTYUIOP'; // Primera fila del teclado
    const ordenTeclasF2 = 'ASDFGHJKLÑ'; // Segunda fila del teclado
    const ordenTeclasF3 = 'ZXCVBNM';    // Tercera fila del teclado
    
    // =============================================
    // VARIABLES DE ESTADO DEL JUEGO
    // =============================================
    let palabras = [];                  // Almacena las palabras según dificultad seleccionada
    let muted = localStorage.getItem('AH-muted') != 'true'; // Estado del sonido
    let palabraSeleccionada = '';       // Palabra actual a adivinar
    let expandedRegistro = false;       // Estado del registro (expandido/contraído)
    let minAux, segAux, cronom;        // Variables para el cronómetro
    let m = 0, s = 0;                  // Minutos y segundos transcurridos
    let intentos = 0;                   // Intentos fallidos
    const letrasAdivinadas = [];        // Letras correctamente adivinadas
    const letrasErroneas = [];          // Letras incorrectamente seleccionadas
    
    // =============================================
    // ELEMENTOS DEL DOM
    // =============================================
    
    // Elementos del teclado
    const fila1Teclado = document.getElementById('f1');
    const fila2Teclado = document.getElementById('f2');
    const fila3Teclado = document.getElementById('f3');
    
    // Botones de control
    const nuevaPartida = document.getElementById('dif-new');
    const volverPartida = document.getElementById('dif-close');
    const volverPartida1 = document.getElementById('win-close');
    const volverPartida2 = document.getElementById('lose-close');
    
    // Elementos de visualización
    const faseImg = document.getElementById('ahorcado-img');
    const campoPalabra = document.getElementById('palabra');
    const winLoseMessage = document.getElementById('win-lose-text');
    const vidas = document.getElementById('vidas');
    
    // Popups
    const dificultades = document.getElementById('dificulty-container');
    const winPopup = document.getElementById('win-container');
    const losePopup = document.getElementById('lose-container');
    const nuevaPartida1 = document.getElementById('nueva-win');
    const nuevaPartida2 = document.getElementById('nueva-lose');
    
    // Elementos de audio
    const malAudio = document.getElementById('fallo');
    const bienAudio = document.getElementById('acerto');
    const winAudio = document.getElementById('gano');
    const loseAudio = document.getElementById('perdio');
    
    // Control de sonido
    const muteBtn = document.getElementById('mute');
    muteBtn.querySelector('img').src = muted ? '../assets/icons/volume_up.svg' : '../assets/icons/volume_off.svg';
    
    // Registro de partidas
    const registroBtn = document.getElementById('registro');
    const registroContainer = document.getElementById('registro-container');
    
    // Inicializa el registro desde localStorage o crea uno nuevo
    if (!localStorage.getItem('AH-registro')) {
        localStorage.setItem('AH-registro', '<div id="registro-row"><h4>Observacion</h4><h4>Vidas</h4><h4>Adivinadas</h4><h4>Erroneas</h4><h4>Palabra</h4><h4>Tiempo</h4></div>');
    }
    registroContainer.innerHTML = localStorage.getItem('AH-registro');
    
    // =============================================
    // MANEJADORES DE EVENTOS PRINCIPALES
    // =============================================
    
    // Selección de dificultad
    document.getElementById('Facil').addEventListener('click', () => {
        palabras = palabrasFaciles;
        empezarPartidaNueva();
    });
    
    document.getElementById('Medio').addEventListener('click', () => {
        palabras = palabrasMedias;
        empezarPartidaNueva();
    });
    
    document.getElementById('Dificil').addEventListener('click', () => {
        palabras = palabrasDificiles;
        empezarPartidaNueva();
    });
    
    // Botón para borrar el registro
    document.getElementById('borrar-registro').addEventListener('click', () => {
        localStorage.setItem('AH-registro', '<div id="registro-row"><h4>Observacion</h4><h4>Vidas</h4><h4>Adivinadas</h4><h4>Erroneas</h4><h4>Palabra</h4><h4>Tiempo</h4></div>');
        registroContainer.innerHTML = localStorage.getItem('AH-registro');
    });
    
    // Botones para nueva partida
    nuevaPartida.addEventListener('click', () => {
        dificultades.style.display = "flex";
    });
    
    nuevaPartida1.addEventListener('click', () => {
        dificultades.style.display = "flex";
    });
    
    nuevaPartida2.addEventListener('click', () => {
        dificultades.style.display = "flex";
    });
    
    // Botones para volver
    volverPartida.addEventListener('click', () => {
        dificultades.style.display = "none";
    });
    
    volverPartida1.addEventListener('click', () => {
        winPopup.style.display = "none";
    });
    

    
    volverPartida2.addEventListener('click', () => {
        losePopup.style.display = "none";
    });    
    // Control de sonido
    muteBtn.addEventListener('click', () => {        
        localStorage.setItem('AH-muted', muted);
        muted = !muted;
        muteBtn.querySelector('img').src = muted ? 
            '../assets/icons/volume_up.svg' : 
            '../assets/icons/volume_off.svg';
    });
    
    // Control del registro
    registroBtn.addEventListener('click', () => {        
        if (expandedRegistro) {
            registroBtn.querySelector('img').src = "../assets/icons/keyboard_arrow_down.svg";
            registroContainer.style.display = 'none';
            expandedRegistro = false;
        } else {
            registroBtn.querySelector('img').src = "../assets/icons/keyboard_arrow_up.svg";
            registroContainer.style.display = 'block';
            expandedRegistro = true;
        }
    });
    // =============================================
    // FUNCIONES DEL JUEGO
    // =============================================
    
    /**
     * Prepara el juego para una nueva partida
     * - Reinicia variables
     * - Selecciona palabra aleatoria
     * - Prepara la visualización
     * - Inicia cronómetro
     * - Crea teclado
     */
    function empezarPartidaNueva() {
        // Reinicia el campo de la palabra
        campoPalabra.innerText = '';
        
        // Reinicia variables del juego
        intentos = 0;
        letrasAdivinadas.length = 0;
        letrasErroneas.length = 0;
        
        // Selecciona palabra aleatoria
        palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
        
        // Prepara los guiones para la palabra
        for (let index = 0; index < palabraSeleccionada.length; index++) {
            campoPalabra.innerText = campoPalabra.innerText + ' _';
        }
        
        // Reinicia visuales
        vidas.innerText = 'vidas: 6';
        faseImg.src = '../assets/ahorcado-fases/fase-0.png';
        
        // Oculta popups
        dificultades.style.display = "none";
        winPopup.style.display = "none";
        losePopup.style.display = "none";
        
        // Reinicia mensajes
        winLoseMessage.innerText = '';
        winLoseMessage.style.paddingTop = '0px';
        
        // Manejo del tiempo
        reiniciarCronometro();
        iniciarCronometro();
        
        // Prepara el teclado
        crearTeclado();
        console.log(palabraSeleccionada);
        
    }
    
    /**
     * Crea el teclado virtual para la partida
     */
    function crearTeclado() {
        // Limpia teclados anteriores
        fila1Teclado.innerHTML = '';
        fila2Teclado.innerHTML = '';
        fila3Teclado.innerHTML = '';
        
        // Crea teclas para la primera fila (QWERTYUIOP)
        for (let i = 0; i < ordenTeclasF1.length; i++) {
            const letra = ordenTeclasF1[i];
            const button = document.createElement('button');
            button.innerText = letra;
            button.className = 'tecla';
            button.id = `key-${letra}`;
            button.addEventListener('click', () => adivinarLetra(button));
            fila1Teclado.appendChild(button);
        }
        
        // Crea teclas para la segunda fila (ASDFGHJKLÑ)
        for (let i = 0; i < ordenTeclasF2.length; i++) {
            const letra = ordenTeclasF2[i];
            const button = document.createElement('button');
            button.innerText = letra;
            button.className = 'tecla';
            button.id = `key-${letra}`;
            button.addEventListener('click', () => adivinarLetra(button));
            fila2Teclado.appendChild(button);
        }
        
        // Crea teclas para la tercera fila (ZXCVBNM)
        for (let i = 0; i < ordenTeclasF3.length; i++) {
            const letra = ordenTeclasF3[i];
            const button = document.createElement('button');
            button.innerText = letra;
            button.className = 'tecla';
            button.id = `key-${letra}`;
            button.addEventListener('click', () => adivinarLetra(button));
            fila3Teclado.appendChild(button);
        }
    }
    
    /**
     * Procesa el intento de adivinar una letra
     */
    function adivinarLetra(e) {
        let acierto = false;
        
        // Verifica cada letra de la palabra seleccionada
        for (let index = 0; index < palabraSeleccionada.length; index++) {
            // Si la letra coincide con alguna de la palabra
            if (e.innerText == palabraSeleccionada[index]) {
                if (muted) bienAudio.play(); // Reproduce sonido de acierto
                
                // Registra letra adivinada
                letrasAdivinadas.push(' ' + palabraSeleccionada[index]);
                
                // Actualiza la visualización de la palabra
                campoPalabra.innerText = campoPalabra.innerText.substring(0, index*2) + 
                                         palabraSeleccionada[index] + 
                                         campoPalabra.innerText.substring(index*2+1);
                
                // Estiliza la tecla como correcta
                e.className = 'tecla-correcta';
                e.disabled = true;
                acierto = true;
                
                // Verifica si ganó (no hay guiones restantes)
                if (!campoPalabra.innerText.includes('_')) {
                    gana();
                }                    
            }
            
            // Si llegó al final sin aciertos
            if (index == palabraSeleccionada.length - 1 && !acierto) {
                if (muted) malAudio.play(); // Reproduce sonido de error
                
                // Registra letra errónea
                letrasErroneas.push(' ' + e.innerText);
                
                // Estiliza la tecla como incorrecta
                e.className = 'tecla-incorrecta';
                e.disabled = true;
                
                // Incrementa intentos fallidos
                intentos++;
                vidas.innerText = `vidas: ${6-intentos}`;
                faseImg.src = `../assets/ahorcado-fases/fase-${intentos}.png`;
                
                // Verifica si perdió
                if (intentos >= 6) {
                    pierde();
                }
            }
        }
    }
    
    /**
     * Maneja la lógica cuando el jugador gana
     */
    function gana() {
        if (muted) winAudio.play(); // Sonido de victoria
        
        // Desactiva todas las teclas
        document.querySelectorAll('.tecla').forEach(e => {
            e.disabled = true;
            e.className = 'tecla-disabled';
        });
        
        // Prepara mensaje del popup
        document.getElementById('win-p').innerHTML = `
            <div id="popup-p-container">
                <h4>Vidas:</h4><p>${6-intentos}</p>
            </div>
            <div id="popup-p-container">
                <h4>Letras Erroneas:</h4><p>${letrasErroneas}</p>
            </div>
            <div id="popup-p-container">
                <h4>Palabra:</h4><p>${palabraSeleccionada}</p>
            </div>
            <div id="popup-p-container">
                <h4>Tiempo:</h4><p>${minAux + ":" + segAux}</p>
            </div>`;
        
        // Actualiza mensaje principal
        winLoseMessage.innerText = `Ganaste, palabra: ${palabraSeleccionada}`;
        winLoseMessage.style.color = 'rgb(124, 234, 139)';
        winLoseMessage.style.paddingTop = '5px';
        
        // Guarda en el registro
        localStorage.setItem('AH-registro', localStorage.getItem('AH-registro') + `
            <div class="divider"></div>
            <div id="registro-row">
                <p>Ganó</p>
                <p>${6-intentos}</p>
                <p>${letrasAdivinadas.toString().trim()}</p>
                <p>${letrasErroneas.toString().trim()}</p>
                <p>${palabraSeleccionada}</p>
                <p>${minAux + ":" + segAux}</p>
            </div>`);
        
        // Actualiza visualización del registro
        registroContainer.innerHTML = localStorage.getItem('AH-registro');
        
        // Detiene cronómetro
        clearInterval(cronom);
        
        // Muestra popup después de 1.5 segundos
        setTimeout(() => {
            winPopup.style.display = 'flex';
        }, 1500);
    }
    
    /**
     * Maneja la lógica cuando el jugador pierde
     */
    function pierde() {
        if (muted) loseAudio.play(); // Sonido de derrota
        
        // Desactiva todas las teclas
        document.querySelectorAll('.tecla').forEach(e => {
            e.disabled = true;
            e.className = 'tecla-disabled';
        });
        
        // Prepara mensaje del popup
        document.getElementById('lose-p').innerHTML = `
            <div id="popup-p-container">
                <h4>Letras Acertadas:</h4><p>${letrasAdivinadas.toString().trim()}</p>
            </div>
            <div id="popup-p-container">
                <h4>Letras Erroneas:</h4><p>${letrasErroneas}</p>
            </div>
            <div id="popup-p-container">
                <h4>Palabra:</h4><p>${palabraSeleccionada}</p>
            </div>
            <div id="popup-p-container">
                <h4>Tiempo:</h4><p>${minAux + ":" + segAux}</p>
            </div>`;
        
        // Actualiza mensaje principal
        winLoseMessage.innerText = `Perdiste, palabra: ${palabraSeleccionada}`;
        winLoseMessage.style.color = 'rgb(234, 124, 124)';
        winLoseMessage.style.paddingTop = '5px';
        
        // Guarda en el registro
        localStorage.setItem('AH-registro', localStorage.getItem('AH-registro') + `
            <div class="divider"></div>
            <div id="registro-row">
                <p>Perdió</p>
                <p>${6-intentos}</p>
                <p>${letrasAdivinadas.toString().trim()}</p>
                <p>${letrasErroneas.toString().trim()}</p>
                <p>${palabraSeleccionada}</p>
                <p>${minAux + ":" + segAux}</p>
            </div>`);
        
        // Actualiza visualización del registro
        registroContainer.innerHTML = localStorage.getItem('AH-registro');
        
        // Detiene cronómetro
        clearInterval(cronom);
        
        // Muestra popup después de 1.5 segundos
        setTimeout(() => {
            losePopup.style.display = 'flex';
        }, 1500);
    }
    
    /**
     * Inicia el cronómetro del juego
     */
    function iniciarCronometro() {
        cronom = setInterval(() => {
            s++; // Incrementa segundos
            
            // Ajusta minutos y segundos
            if (s > 59) {
                m++;
                s = 0;
            }
            
            // Formatea para mostrar siempre 2 dígitos
            segAux = s < 10 ? "0" + s : s;
            minAux = m < 10 ? "0" + m : m;
            
            // Actualiza visualización
            document.getElementById("hms").innerText = minAux + ":" + segAux;
        }, 1000);
    }
    
    /**
     * Reinicia el cronómetro a cero
     */
    function reiniciarCronometro() {
        clearInterval(cronom);
        document.getElementById("hms").innerText = "00:00";
        m = 0;
        s = 0;
    }
});