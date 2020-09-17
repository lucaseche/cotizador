// deberia hacer una clase auto?
function Auto(marca, modelo, año, gnc){
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.gnc = gnc;
}


// capturar los atributos del formulario
// Pendiente para cuando veamos DOM y eventos

// creo un auto con los atributos obtenidos
let auto = new Auto("chevrolet", "onix", 2017, false);

// podria guardar el auto en localstorage para proximas cotizaciones
// la idea es mostrar los datos de la visita anterior como default en el formulario
let autoStr = JSON.stringify(auto);
localStorage.setItem('auto',autoStr);

