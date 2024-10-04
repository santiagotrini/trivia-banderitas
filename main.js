// direccion de la API con las banderas y los nombres
const url = 'https://restcountries.com/v3.1/all?fields=flag,name';
// variables globales para el juego
let preguntas = 10;
let aciertos = 0;
// aca voy a poner toda la data que me da la API
let data = [];
// elementos de la pagina que quiero tener a mano siempre
let pais = document.createElement('h2');
let container = document.querySelector('.container');
// vamos a buscar los datos con fetch
fetch(url)
  .then(res => res.json())
  .then(paises => {
    data = paises;
    mezclar(data);  // los datos vienen siempre en el mismo orden
                    // los mezclamos
    // elegimos el pais que hay que adivinar
    pais.textContent = data[Math.floor(Math.random()*4)].name.common;
    container.before(pais);
    // este for crea los 4 botones para jugar
    for (let i = 0; i < 4; i++) {
      let button = document.createElement('button');
      button.textContent = data[i].flag; // el emoji de la bandera
      button.dataset.pais = data[i].name.common; // atributo data-pais
      // ponerle algo a los botones para que hagan algo cuando los clickeo
      button.onclick = handleClick;
      container.append(button);
    }
  });

// const data = [
//   { nombre: 'Argentina', bandera: 'Bandera de Argentina' },
//   { nombre: 'Francia', bandera: 'Bandera de Francia' },
//   { nombre: 'Uruguay', bandera: 'Bandera de Uruguay' },
//   { nombre: 'Bolivia', bandera: 'Bandera de Bolivia' },
//   { nombre: 'Paraguay', bandera: 'Bandera de Paraguay' },
//   { nombre: 'Venezuela', bandera: 'Bandera de Venezuela' },
//   { nombre: 'Colombia', bandera: 'Bandera de Colombia' },
//   { nombre: 'España', bandera: 'Bandera de España' },
// ];



function handleClick(event) {
  let btn = event.target;
  preguntas = preguntas - 1;
  // deshabilitar todos los botones
  let todosLosBotones = document.querySelectorAll('button');
  for (let boton of todosLosBotones) 
    boton.disabled = true;
  // cambiar el color para que el usuario sepa
  if (btn.dataset.pais == pais.textContent) {
    btn.style.background = 'forestgreen';
    aciertos = aciertos + 1;
  }
  else
    btn.style.background = 'firebrick'; 
  // actualizar el puntaje
  let h1 = document.querySelector('#puntos');
  h1.textContent = `Puntaje: ${aciertos}/10 Restantes: ${preguntas}`;
  // volver a preguntar
  if (preguntas > 0)
    setTimeout(reset, 1000);  // esto hace que se ejecute reset a los 1000 ms
  else
    gameOver();  
}

function gameOver() {
  container.innerHTML = '';
  pais.textContent = 'Game Over';
}

function mezclar(data) {
  for (let i = 0; i < 1000; i++) {
    let n = data.length;  // cuantos elementos tiene el array?
    let r = Math.floor(Math.random()*n); // elijo 2 numeros al azar 
    let s = Math.floor(Math.random()*n); // entre 0 y n-1
    // intercambiar 2 elementos
    let temp = data[r];
    data[r]  = data[s];
    data[s]  = temp;
  }
}

function reset() {
  mezclar(data);
  pais.textContent = data[Math.floor(Math.random()*4)].name.common;
  container.before(pais);
  // cuando reseteamos borramos los botones que estaban antes
  container.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    let button = document.createElement('button');
    button.textContent = data[i].flag;
    button.dataset.pais = data[i].name.common;
    // ponerle algo a los botones para que hagan algo cuando los clickeo
    button.onclick = handleClick;
    container.append(button);
  }
}


