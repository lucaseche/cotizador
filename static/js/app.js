class Auto {
    constructor(marca, modelo, año, gnc) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.gnc = gnc;
    }
}


// capturar los atributos del formulario
// Pendiente para cuando veamos DOM y eventos
const yesGNC = document.querySelector('#yesGNC');
const noGNC = document.querySelector('#noGNC');
const inputGNCPrice = document.querySelector('#inputGNCPrice');

yesGNC.addEventListener('click', enableInputGNCPrice);
noGNC.addEventListener('click', disableInputGNCPrice);

function enableInputGNCPrice() {
    if(inputGNCPrice.disabled == true){
        inputGNCPrice.disabled = false;    
    }
}

function disableInputGNCPrice() {
    if(inputGNCPrice.disabled == false){
        inputGNCPrice.disabled = true;    
    }
    if(inputGNCPrice.value != ''){
        inputGNCPrice.value = '';
    }
    // console.log(inputGNCPrice.value);
}


// creo un auto con los atributos obtenidos
let auto = new Auto("chevrolet", "onix", 2017, false);

// podria guardar el auto en localstorage para proximas cotizaciones
// la idea es mostrar los datos de la visita anterior como default en el formulario
let autoStr = JSON.stringify(auto);
localStorage.setItem('auto',autoStr);

