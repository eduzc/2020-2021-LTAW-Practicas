// -- Definicion de funciones en js
// -- Empezaremos definiendo funciones sin parámetros de 4 formas:

// -- Definición clásica
function mi_funcion1() {
    console.log("Mi funcion 1");
}

// -- Definimos función y le asignamos una variable
const mi_funcion2 = function(){
    console.log("Mi funcion 2");
}

// -- Lo mismo que lo anterior pero abreviado
const mi_funcion3 = () => {
    console.log("Mi funcion 3");
}

// -- Definimos funciones dentro de un objeto
// -- Mezclamos los metodos 2 y 3
const a = {
    x : 10,
    f4 : function(){
        console.log("Mi funcion 4");
    },
    f5 : () => {
        console.log("Mi funcion 5");
    }
}

// -- Llamamos a las funciones
mi_funcion1()
mi_funcion2()
mi_funcion3()
a.f4()
a.f5() 
