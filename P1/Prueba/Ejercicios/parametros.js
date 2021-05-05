// -- Ejemplo de paso de parametros a funciones

// -- Recibe dos parámetros y devuelve su suma 
function suma(x,y) {
    // devolver la suma
    return x+y;
}

// -- Recibe un parámetro y lo imprime por la consola
function mensaje(msg){
    console.log(msg);
}

// -- Funcion que no recibe parametros
function saluda(){
    mensaje("Hola");
}
// -- Funcion que no recibe parametros 2 
function adios(){
    mensaje("Adios");
}
// -- Funcion que recibe una funcion como parametro
// -- y simplemente la llama
function call(func) {
    console.log("--> Funcion recibida");
    // -- Llamar a la funcion pasada como argumento
    func();
}

// Llamamos a las funciones creadas previamente

// -- Llamada a suma
let a = suma(2,22);

// -- Probando las funciones mensajes
mensaje("Prueba");
mensaje(a);

// -- Probando la funcion call
call(saluda);
call(adios);

// -- 
call( () => {
    mensaje("HOlIWIS")

});