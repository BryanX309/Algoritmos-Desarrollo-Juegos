document.addEventListener('DOMContentLoaded', () => {
    
const palabrasFaciles = [
  'SOL', 'AGUA', 'LUNA', 'CASA', 'PERRO', 'GATO', 'FLOR', 'PAN', 'PATO', 'RIO',
  'RED', 'PIE', 'OSO', 'SAL', 'MAR', 'OLA', 'PALO', 'RATON', 'PELO', 'LUZ',
  'DOS', 'TRES', 'COPA', 'PAPA', 'MESA', 'SILLA', 'CAMA', 'VINO', 'QUESO', 'ARROZ',
  'PESO', 'DIA', 'NOCHE', 'CIELO', 'NUBE', 'HOJA', 'PIEL', 'HUESO', 'PUNTO', 'LINEA',
  'CARA', 'MANO', 'PIES', 'OJOS', 'BOCA', 'NARIZ', 'OREJA', 'PELO', 'UÑA', 'LABIO',
  'REY', 'REINA', 'CABALLO', 'TORO', 'CABRA', 'OVEJA', 'GALLO', 'POLLO', 'PEZ', 'JAZZ', 'KIWI', 'XENON', 'YOGUR', 'RANA'
];

const palabrasMedias = [
  'ELEFANTE', 'JIRAFA', 'TORTUGA', 'LEOPARDO', 'CANGURO', 'MURCIELAGO', 'CEBRA', 'DELFIN', 'TIBURON', 'ARDILLA',
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
    let palabraSeleccionada = '';
    let campoPalabra = document.getElementById('palabra');

    const fila1Teclado = document.getElementById('f1');
    const fila2Teclado = document.getElementById('f2');
    const fila3Teclado = document.getElementById('f3');
    let intentos = 0
    const nuevaPartida = document.getElementById('dif-new');
    const volverPartida = document.getElementById('dif-close');

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
    nuevaPartida.addEventListener('click', () => {
        document.getElementById('dif-in-container').style.display = "flex";
        nuevaPartida.style.display = "none"
        document.getElementById('teclado').style.display = "none"
        document.getElementById('dif-close').style.display = "block";
    });
    volverPartida.addEventListener('click', () => {
        document.getElementById('dif-in-container').style.display = "none";
        nuevaPartida.style.display = "flex"
        document.getElementById('teclado').style.display = "grid"
        document.getElementById('dif-close').style.display = "none";
    });




    const faseImg = document.getElementById('ahorcado-img');
    
    
    const letrasAdivinadas = [];
    
    


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
        document.getElementById('dif-close').style.display = "none";
        campoPalabra.innerText = '';
        intentos = 0;
        letrasAdivinadas.length = 0;
        faseImg.src = '../assets/fase-0.png';
        palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
        

        for (let index = 0; index < palabraSeleccionada.length; index++) {
            campoPalabra.innerText = campoPalabra.innerText + ' _';
        }
        faseImg.src = '../assets/fase-0.png';
        document.getElementById('dif-in-container').style.display = "none";
        nuevaPartida.style.display = "flex"
        document.getElementById('dif-disabled').style.display = "none";
        nuevaPartida.innerHTML = '<img src="../assets/add.svg" alt="">';
        document.getElementById('teclado').style.display = "grid"
        
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
    console.log(e.innerText);
            //console.log(palabraSeleccionada);
            
            for (let index = 0; index < palabraSeleccionada.length; index++) {
                console.log(palabraSeleccionada[index]);
                if (e.innerText==palabraSeleccionada[index]) {
                    letrasAdivinadas.push(palabraSeleccionada[index]);
                    console.log(letrasAdivinadas);
                    campoPalabra.innerText = campoPalabra.innerText.substring(0,index*2) + palabraSeleccionada[index] + campoPalabra.innerText.substring(index*2+1);
                    console.log(campoPalabra.innerText.substring(index*2, index*2+1));
                    e.className = 'tecla-correcta';
                    e.disabled = true;
                    if (campoPalabra.innerText.includes('_') == false) {
                        gana();
                        
                    }                    
                }
                if (index == palabraSeleccionada.length - 1 && e.className != 'tecla-correcta') {
                    e.className = 'tecla-incorrecta';
                    e.disabled = true;
                    intentos++;
                    faseImg.src = `../assets/fase-${intentos}.png`;
                    if (intentos >= 6) {
                        pierde();
                    }
                    console.log(`Intentos: ${intentos}`);
                    
                }
                
            }
}

function gana(){
    
    document.querySelectorAll('.tecla').forEach(e => {
        e.disabled = true;
        e.className = 'tecla-disabled';
    });
    alert('Has ganado, la palabra era: ' + palabraSeleccionada);
    nuevaPartida.innerHTML = '<img src="../assets/add.svg" alt=""><h4>Nueva Partida</h4>'
}

function pierde(){
    document.querySelectorAll('.tecla').forEach(e => {
        e.disabled = true;
        e.className = 'tecla-disabled';
    });
    alert('Has perdido, la palabra era: ' + palabraSeleccionada);
    nuevaPartida.innerHTML = '<img src="../assets/add.svg" alt=""><h4>Nueva Partida</h4>'

}


});