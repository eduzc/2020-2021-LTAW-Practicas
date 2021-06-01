// Para declarar mis variables uso let
let n = 3;
// Imprimo mi variable:
console.log("Mi variable es n:", n , "metros")


console.log(`Variable n: ${n} metros`);

//-- Concatenar la variable al mensaje
console.log(`Variable n: ${n} metros`);


const N = 10;
for (i = 0; i < N; i++) {
    console.log("Mensaje " + i);

}

//---------------------------------------------------------

// Objetos literales definimos propiedades que tienen un valor. 

// Los objetos literales se crean con las llaves {}. 
// En este ejemplo se define la variable objeto1 que tiene 3 propiedades
const objeto1 = {
    nombre: "Objeto1",
    valor: 10,
    test: true 
};

// Imprimo las propiedades del objeto
console.log("Nombre: " + objeto1.nombre);
console.log("valor: " + objeto1.valor);
console.log("test: " + objeto1.test);

//-- Comprobamos si un objeto tiene una propiedad
if("test" in objeto1) {
    console.log("\nTiene la propiedad test");
}

//-- Recorro todas las propiedades
console.log("holi");
for (prop in objeto1){
    console.log(`Propiedad: ${prop} --> Valor: {objeto1[prop]}`);
}



