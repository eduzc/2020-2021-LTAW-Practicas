// -- Creacion de arrays

// -- Arrays de 4 elementos

const array = [1,3,5,7];

// -- Mostramos el elemento numero 2 
console.log("Elemento 2: " + array[2]);

// -- Recorremos todos los elementos del array 
for (i in array){
    console.log(`array[${i}] = ${array[i]}`);
}

// -- Imprimimos el numero total de elementos
console.log("Cantidad de elementos: " + array.length);