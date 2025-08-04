document.addEventListener('DOMContentLoaded', () => {
    
const palabrasFaciles = [
  'SOL', 'AGUA', 'LUNA', 'CASA', 'PERRO', 'GATO', 'FLOR', 'PAN', 'PATO', 'RIO',
  'RED', 'PIE', 'OSO', 'SAL', 'MAR', 'OLA', 'PALO', 'RATON', 'PELO', 'LUZ',
  'DOS', 'TRES', 'COPA', 'PAPA', 'MESA', 'SILLA', 'CAMA', 'VINO', 'QUESO', 'ARROZ',
  'PESO', 'DIA', 'NOCHE', 'CIELO', 'NUBE', 'HOJA', 'PIEL', 'HUESO', 'PUNTO', 'LINEA',
  'CARA', 'MANO', 'PIES', 'OJOS', 'BOCA', 'NARIZ', 'OREJA', 'PELO', 'UÑA', 'LABIO',
  'REY', 'REINA', 'CABALLO', 'TORO', 'CABRA', 'OVEJA', 'GALLO', 'POLLO', 'PEZ', 'JAZZ', 'YOGUR', 'RANA'
];

const palabrasMedias = [
  'ELEFANTE', 'JIRAFA', 'TORTUGA', 'LEOPARDO', 'CANGURO', 'MURCIELAGO', 'CEBRA', 'DELFIN', 'TIBURON', 'ARDILLA', 'KIWI', 
  'BICICLETA', 'AUTOMOVIL', 'TELEVISION', 'COMPUTADORA', 'REFRIGERADOR', 'VENTILADOR', 'PARAGUAS', 'TELEFONO', 'CAMARA', 'RELOJ',
  'ESCUELA', 'HOSPITAL', 'BIBLIOTECA', 'RESTAURANTE', 'SUPERMERCADO', 'AEROPUERTO', 'ESTACION', 'FARMACIA', 'TIENDA', 'GIMNASIO',
  'JARDINERO', 'DOCTOR', 'INGENIERO', 'MAESTRO', 'POLICIA', 'BOMBERO', 'CARPINTERO', 'PINTOR', 'MUSICO', 'CHEF',
  'CHOCOLATE', 'HELADO', 'GALLETA', 'PASTEL', 'CARAMELO', 'PANQUEQUE', 'ENSALADA', 'SANDWICH', 'HAMBURGUESA', 'PIZZA',
  'GLOBOS', 'REGALO', 'VELAS', 'TARJETA', 'FIESTA', 'JUEGO', 'CANCION', 'BAILE', 'VIAJE', 'AVENTURA'
];

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


    //nuevaPartida.style.display = "none"
    let palabras = '';
    const ordenTeclasF1 = 'QWERTYUIOP';
    const ordenTeclasF2 = 'ASDFGHJKLÑ';
    const ordenTeclasF3 = 'ZXCVBNM';
    let muted = localStorage.getItem('AH-muted')!='true';
    let palabraSeleccionada = '';
    let campoPalabra = document.getElementById('palabra');
    let expandedRegistro = false;
    let minAux, segAux, cronom;
    let m=0,s=0;
    let intentos = 0
    const letrasAdivinadas = [];
    const letrasErroneas = [];
    
    

    const fila1Teclado = document.getElementById('f1');
    const fila2Teclado = document.getElementById('f2');
    const fila3Teclado = document.getElementById('f3');
    const nuevaPartida = document.getElementById('dif-new');
    const volverPartida = document.getElementById('dif-close');
    const volverPartida1 = document.getElementById('win-close');
    const volverPartida2 = document.getElementById('lose-close');
    const faseImg = document.getElementById('ahorcado-img');
    const dificultades = document.getElementById('dificulty-container');
    const winPopup = document.getElementById('win-container');
    const losePopup = document.getElementById('lose-container');
    const nuevaPartida1 = document.getElementById('nueva-win');
    const nuevaPartida2 = document.getElementById('nueva-lose');
    const winLoseMessage = document.getElementById('win-lose-text');
    const malAudio = document.getElementById('fallo')
    const bienAudio = document.getElementById('acerto')
    const winAudio = document.getElementById('gano')
    const loseAudio = document.getElementById('perdio')
    const muteBtn = document.getElementById('mute')
    const registroBtn = document.getElementById('registro')
    const registroContainer = document.getElementById('registro-container')
    const vidas = document.getElementById('vidas')

    muteBtn.querySelector('img').src=muted?'../assets/icons/volume_up.svg':'../assets/icons/volume_off.svg';
    
    if (!localStorage.getItem('AH-registro')) {
        localStorage.setItem('AH-registro','<div id="registro-row"><h4>Observacion</h4><h4>Vidas</h4><h4>Adivinadas</h4><h4>Erroneas</h4><h4>Palabra</h4><h4>Tiempo</h4></div>');
    }
    registroContainer.innerHTML = localStorage.getItem('AH-registro');
    
    
    console.log(localStorage.getItem('AH-muted'));
    
    
    document.getElementById('Facil').addEventListener('click', () => {
        palabras = palabrasFaciles;
        lineasCampoPalabra();
    });
    document.getElementById('Medio').addEventListener('click', () => {
        palabras = palabrasMedias;
        lineasCampoPalabra();
    });
    document.getElementById('Dificil').addEventListener('click', () => {
        palabras = palabrasDificiles;
        lineasCampoPalabra();
    });
    
    
    document.getElementById('borrar-registro').addEventListener('click', () => {
        localStorage.setItem('AH-registro','<div id="registro-row"><h4>Observacion</h4><h4>Vidas</h4><h4>Adivinadas</h4><h4>Erroneas</h4><h4>Palabra</h4><h4>Tiempo</h4></div>');
        registroContainer.innerHTML = localStorage.getItem('AH-registro');
    });



    nuevaPartida.addEventListener('click', () => {
        dificultades.style.display = "flex";
        // nuevaPartida.style.display = "none"
        // document.getElementById('teclado').style.display = "none"
        // document.getElementById('dif-close').style.display = "block";
    });
    nuevaPartida1.addEventListener('click', () => {
        // winPopup.style.display = "none";
        dificultades.style.display = "flex";
        // nuevaPartida.style.display = "none"
        // document.getElementById('teclado').style.display = "none"
        // document.getElementById('dif-close').style.display = "block";
    });
    nuevaPartida2.addEventListener('click', () => {
        // losePopup.style.display = "none";
        dificultades.style.display = "flex";
        // nuevaPartida.style.display = "none"
        // document.getElementById('teclado').style.display = "none"
        // document.getElementById('dif-close').style.display = "block";
    });



    volverPartida.addEventListener('click', () => {
        dificultades.style.display = "none";
        // nuevaPartida.style.display = "flex"
        // document.getElementById('teclado').style.display = "grid"
        // document.getElementById('dif-close').style.display = "none";
    });
    volverPartida1.addEventListener('click', () => {
        winPopup.style.display = "none";
        // nuevaPartida.style.display = "flex"
        // document.getElementById('teclado').style.display = "grid"
        // document.getElementById('dif-close').style.display = "none";
    });
    volverPartida2.addEventListener('click', () => {
        losePopup.style.display = "none";
        // nuevaPartida.style.display = "flex"
        // document.getElementById('teclado').style.display = "grid"
        // document.getElementById('dif-close').style.display = "none";
    });


    muteBtn.addEventListener('click', () => {        
        if (muted) {
            muteBtn.querySelector('img').src='../assets/icons/volume_off.svg'
            muted=false;
            localStorage.setItem('AH-muted', !muted)
        }else{
            muteBtn.querySelector('img').src='../assets/icons/volume_up.svg'
            muted=true;
            localStorage.setItem('AH-muted', !muted)
        }
        // nuevaPartida.style.display = "flex"
        // document.getElementById('teclado').style.display = "grid"
        // document.getElementById('dif-close').style.display = "none";
    });

    registroBtn.addEventListener('click', () => {        
        if (expandedRegistro) {
            registroBtn.querySelector('img').src="../assets/icons/keyboard_arrow_down.svg";
            registroContainer.style.display='none'
            expandedRegistro=false
        }else{
            registroBtn.querySelector('img').src="../assets/icons/keyboard_arrow_up.svg";
            registroContainer.style.display='block'
            expandedRegistro=true
        }
        // nuevaPartida.style.display = "flex"
        // document.getElementById('teclado').style.display = "grid"
        // document.getElementById('dif-close').style.display = "none";
    });



        
    


    // teclas.forEach(item => {
        
    //     item.addEventListener('click', (e) => {
    //         console.log(e.target.innerText);
    //         //console.log(palabraSeleccionada);
            
    //         for (let index = 0; index < palabraSeleccionada.length; index++) {
    //             console.log(palabraSeleccionada[index]);
    //             if (e.target.innerText==palabraSeleccionada[index]) {
    //                 letrasAdivinadas.push(palabraSeleccionada[index]);
    //                 console.log(letrasAdivinadas);
    //                 campoPalabra.innerText = campoPalabra.innerText.substring(0,index*2) + palabraSeleccionada[index] + campoPalabra.innerText.substring(index*2+1);
    //                 console.log(campoPalabra.innerText.substring(index*2, index*2+1));
    //                 // Aquí puedes agregar lógica para mostrar la letra adivinada en el tablero
                    
    //             }
                
    //         }
    //     });


        
    // });

    

    


function lineasCampoPalabra() {
        campoPalabra.innerText = '';
        intentos = 0;
        letrasAdivinadas.length = 0;
        letrasErroneas.length = 0;
        faseImg.src = '../assets/ahorcado-fases/fase-0.png';
        palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
        

        for (let index = 0; index < palabraSeleccionada.length; index++) {
            campoPalabra.innerText = campoPalabra.innerText + ' _';
        }
        vidas.innerText='vidas: 6'
        faseImg.src = '../assets/ahorcado-fases/fase-0.png';
        dificultades.style.display = "none";
        winPopup.style.display = "none";
        losePopup.style.display = "none";
        nuevaPartida.style.display = "flex";   
        winLoseMessage.innerText = '';
        winLoseMessage.style.paddingTop = '0px'
        reiniciarCronometro()
        iniciarCronometro();
        crearTeclado();
    }



function crearTeclado() {
        fila1Teclado.innerHTML = '';
        fila2Teclado.innerHTML = '';
        fila3Teclado.innerHTML = '';
        
        for (let i = 0; i < ordenTeclasF1.length; i++) {
            const letra = ordenTeclasF1[i];
            const button = document.createElement('button');
            button.innerText = letra;
            button.className = 'tecla';
            button.id = `key-${letra}`;
            button.addEventListener('click', () => adivinarLetra(button));
            fila1Teclado.appendChild(button);
        }
        for (let i = 0; i < ordenTeclasF2.length; i++) {
            const letra = ordenTeclasF2[i];
            const button = document.createElement('button');
            button.innerText = letra;
            button.className = 'tecla';
            button.id = `key-${letra}`;
            button.addEventListener('click', () => adivinarLetra(button));
            fila2Teclado.appendChild(button);
        }
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

function adivinarLetra(e){
    // console.log(e.innerText);
            //console.log(palabraSeleccionada);
            
            for (let index = 0; index < palabraSeleccionada.length; index++) {
                // console.log(palabraSeleccionada[index]);
                if (e.innerText==palabraSeleccionada[index]) {
                    if (muted) {
                        bienAudio.play()
                    }
                    letrasAdivinadas.push(' '+palabraSeleccionada[index]);
                    console.log(`Letras adivinadas: ${letrasAdivinadas}`);
                    campoPalabra.innerText = campoPalabra.innerText.substring(0,index*2) + palabraSeleccionada[index] + campoPalabra.innerText.substring(index*2+1);
                    // console.log(campoPalabra.innerText.substring(index*2, index*2+1));
                    e.className = 'tecla-correcta';
                    e.disabled = true;
                    
                    if (campoPalabra.innerText.includes('_') == false) {
                        gana();
                        
                    }                    
                }
                if (index == palabraSeleccionada.length - 1 && e.className != 'tecla-correcta') {
                    if (muted) {
                        malAudio.play()
                    }
                    letrasErroneas.push(' '+e.innerText);
                    console.log(`Letras erroneas: ${letrasErroneas}`);
                    
                    e.className = 'tecla-incorrecta';
                    e.disabled = true;
                    intentos++;
                    vidas.innerText=`vidas: ${6-intentos}`
                    faseImg.src = `../assets/ahorcado-fases/fase-${intentos}.png`;
                    if (intentos >= 6) {
                        pierde();
                    }
                    console.log(`Intentos: ${intentos}`);
                    
                }
                
            }
}

function gana(){
    if (muted) {
        winAudio.play()
    }
    document.querySelectorAll('.tecla').forEach(e => {
        e.disabled = true;
        e.className = 'tecla-disabled';
    });
    document.getElementById('win-p').innerHTML=`
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
    winLoseMessage.innerText = `Ganaste, palabra: ${palabraSeleccionada}`;
    winLoseMessage.style.color = 'rgb(124, 234, 139)';
    winLoseMessage.style.paddingTop = '5px'
    localStorage.setItem('AH-registro', localStorage.getItem('AH-registro')+`
        <div class="divider">
        </div>
        <div id="registro-row">
            <p>Ganó</p>
            <p>${6-intentos}</p>
            <p>${letrasAdivinadas.toString().trim()}</p>
            <p>${letrasErroneas.toString().trim()}</p>
            <p>${palabraSeleccionada}</p>
            <p>${minAux + ":" + segAux}</p>
        </div>`);
    registroContainer.innerHTML = localStorage.getItem('AH-registro');
    clearInterval(cronom);
    setTimeout(() => {
        winPopup.style.display = 'flex';
    },1500);
}

function pierde(){
    if (muted) {
        loseAudio.play()
    }
    document.querySelectorAll('.tecla').forEach(e => {
        e.disabled = true;
        e.className = 'tecla-disabled';
    });
    
    document.getElementById('lose-p').innerHTML=`
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
    winLoseMessage.innerText = `Perdiste, palabra: ${palabraSeleccionada}`;
    winLoseMessage.style.color = 'rgb(234, 124, 124)'
    winLoseMessage.style.paddingTop = '5px'
    localStorage.setItem('AH-registro', localStorage.getItem('AH-registro')+`
        <div class="divider">
        </div>
        <div id="registro-row">
            <p>Perdió</p>
            <p>${6-intentos}</p>
            <p>${letrasAdivinadas.toString().trim()}</p>
            <p>${letrasErroneas.toString().trim()}</p>
            <p>${palabraSeleccionada}</p>
            <p>${minAux + ":" + segAux}</p>
        </div>`);
    registroContainer.innerHTML = localStorage.getItem('AH-registro');
    clearInterval(cronom);
    setTimeout(() => {
        losePopup.style.display = 'flex';
    }, 1500);
    

}

function iniciarCronometro() {
    cronom = setInterval(()=>{
        s++;
        if (s>59){m++;s=0;}

        if (s<10){segAux="0"+s;}else{segAux=s;}
        if (m<10){minAux="0"+m;}else{minAux=m;}

        document.getElementById("hms").innerText = minAux + ":" + segAux;
    },1000);
    
}

function reiniciarCronometro() {
    clearInterval(cronom);
    document.getElementById("hms").innerText="00:00";
    m=0;s=0;
}


});