// esta clase podria estar en otro archivo
class Car {
    constructor(make, model, year, gnc, gncPrice) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.gnc = gnc;
        this.gncPrice = gncPrice;
    }
}

/* TO DO

[X] - Cargar datos en el selector de marca
[X] - Obtener la marca seleccionada con un evento 'change'
[X] - Cargar datos en el selector de modelo a partir de la marca elegida  
[X] - Obtener el modelo seleccionado con un evento 'change'
[X] - Cargar datos en el selector de año a partir del modelo elegido  
[X] - Obtener el año seleccionado con un evento 'change'
[X] - Capturar el submit del boton cotizar
[X] - Guardar datos del auto cotizado en el localStorage en el submit del boton cotizar
[X] - Obtener los datos del ultimo auto cotizado guardado en el localStorage si es que hay uno
[ ] - BUG: el precio del equipo no se carga en el formulario si esta en localStorage
*/

const makeSelect = document.querySelector('#makeSelect');
const modelSelect = document.querySelector('#modelSelect');
const yearSelect = document.querySelector('#yearSelect');
const yesGncInput = document.querySelector('#yesGncInput');
const noGncInput = document.querySelector('#noGncInput');
const gncPriceInput = document.querySelector('#gncPriceInput');
const btnQuote = document.querySelector('#btnQuote');

// creo un evento para poder simular el 'change' desde funciones
const changeEvent = document.createEvent('HTMLEvents');
changeEvent.initEvent('change', false, true);

// cargo todos los events listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getCar);
    makeSelect.addEventListener('change', fillModelSelect);
    modelSelect.addEventListener('change', fillYearSelect);
    yesGncInput.addEventListener('click', enableGncPriceInput);
    noGncInput.addEventListener('click', disableGncPriceInput);
    btnQuote.addEventListener('click', quoteCarInsurance);
}

function getCar(event){
    /*
    Esta funcion busca la informacion del ultimo auto cotizado almacenado en localStorage.
    Si encuentra un auto, completa los campos del formulario con los datos del auto encontrado.
    Si no encuentra un auto, llama a la funcion que carga las marcas de autos.
    Args:
        event: objeto evento ('DOMContentLoaded').
    */
    
    fillMakeSelect();

    if(localStorage.getItem('quotedCar') !== null){
        loadQuotedCar();
    }
}

function loadQuotedCar(){
    /*
    Esta funcion completa los campos del formulario con los datos del auto cotizado previamente.
    */

    const quotedCar = JSON.parse(localStorage.getItem('quotedCar'));
    makeSelect.childNodes.forEach(make => {
        if(make.textContent == quotedCar.make){
            make.selected = 'selected';
        }
    })

    // simulo un cambio en el select de marca
    makeSelect.dispatchEvent(changeEvent);

    modelSelect.childNodes.forEach(model => {
        if(model.textContent == quotedCar.model){
            model.selected = 'selected';
        }
    })

    // simulo un cambio en el select de modelo
    modelSelect.dispatchEvent(changeEvent);

    yearSelect.childNodes.forEach(year => {
        if(year.textContent == quotedCar.year){
            year.selected = 'selected';
        }
    })
}

function fillMakeSelect(){
    /*
    Esta funcion completa el select de marcas.
    Args:
        makeSelect: objeto select de marcas.
    */

    const makes = getMakes();
    fillSelect(makes, makeSelect);
}

function fillModelSelect(event){
    /*
    Esta funcion completa los modelos de auto para la marca seleccionada.
    Args:
        event: evento que dispara la ejecucion de la funcion.
    */
    
    // reseteo cuando se cambia la marca
    modelSelect.innerHTML = '';
    const selectedMake = event.target[event.target.selectedIndex].textContent;
    const models = getModels(selectedMake);
    fillSelect(models, modelSelect);
    modelSelect.dispatchEvent(changeEvent);
}

function fillYearSelect(event){
    /*
    Esta funcion completa los modelos de auto para la marca seleccionada.
    Args:
        event: evento que dispara la ejecucion de la funcion.
    */

    // reseteo cuando se cambia el modelo
    yearSelect.innerHTML = '';
    const selectedModel = event.target[event.target.selectedIndex].textContent;
    const years = getYears(selectedModel);
    fillSelect(years, yearSelect);
}

function getMakes(){
    /*
    Esta funcion obtiene las marcas de autos del set de datos 'cars.js'.
    Return:
        makes: listado de marcas de autos (sin reperir).
    */

    // utilizo un set porque no guarda repetidos
    const makes = new Set();
    
    cars.forEach(car => {
        makes.add(car.make);
    });

    // convierto el set en un array para poder ordenarlo alfabeticamente
    return [...makes].sort();
}

function getModels(selectedMake){
    /*
    Esta funcion obtiene los modelos de autos del set de datos 'cars.js' para la marca seleccionada.
    Args:    
        selectedMake: marca seleccionada.
    Return:
        models: listado de modelos de auto para una marca seleccionada (sin reperir).
    */

    // utilizo un set porque no guarda repetidos
    const models = new Set();
    
    cars.forEach(car => {
        if(car.make == selectedMake){
            models.add(car.model);
        }
    })

    // convierto el set en un array para poder ordenarlo alfabeticamente
    return [...models].sort();
}

function getYears(selectedModel){
    /*
    Esta funcion obtiene los años de modelos de autos del set de datos 'cars.js' para el modelo seleccionada.
    Args:    
        selectedModel: modelo seleccionado.
    Return:
        years: listado de años para un modelo seleccionado (sin reperir).
    */

    // utilizo un set porque no guarda repetidos
    const years = new Set();
    
    cars.forEach(car => {
        if(car.model == selectedModel){
            years.add((car.year).toString());
        }
    })

    // convierto el set en un array para poder ordenarlo alfabeticamente
    return [...years].sort();
}

function fillSelect(arr, select){
    /*
    Esta funcion completa un select con los elementos de un array.
    Args:
        arr: listado de elementos. pueden ser marcas, modelos o años.
        select: objeto select donde se van a cargar los elementos.
    */

    arr.forEach(element => {
        const option = document.createElement('option');
        // guardo el nombre formateado en el value de la opcion
        option.value = element.toLowerCase().replace(' ', '-');
        option.textContent = element;
        // agrego la opcion al select
		select.appendChild(option);        
    });
}

function enableGncPriceInput(){
    /*
    Esta funcion habilita el input de valor para el equipo gnc.
    */
    if(gncPriceInput.disabled == true){
        gncPriceInput.disabled = false;    
    }
}

function disableGncPriceInput(){
    /*
    Esta funcion deshabilita el input de precio para el equipo gnc y borra el valor de ser necesario.
    */
    if(gncPriceInput.disabled == false){
        gncPriceInput.disabled = true;    
    }
    if(gncPriceInput.value != ''){
        gncPriceInput.value = '';
    }
}

function quoteCarInsurance(event){
    /*
    Esta funcion genera la cotizacion del seguro del auto.
    Por el momento unicamente guarda los datos del auto en localStorage.
    Args:
        event: evento que dispara la ejecucion de la funcion. 
    */

    // obtengo los valores actuales del formulario
    const make = makeSelect.options[makeSelect.selectedIndex].textContent;
    const model = modelSelect.options[modelSelect.selectedIndex].textContent;
    const year = yearSelect.options[yearSelect.selectedIndex].textContent;
    const gnc = !gncPriceInput.disabled;
    const gncPrice = gncPriceInput.value;

    // creo un nuevo auto
    const car = new Car(make, model, year, gnc, gncPrice);

    // guardo los datos del auto cotizado en localStorage
    localStorage.setItem('quotedCar', JSON.stringify(car));
}