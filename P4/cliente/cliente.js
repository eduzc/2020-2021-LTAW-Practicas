// Definicion de constantes
// Pedimos el nick del usuario
let nick = prompt("Introduce tu nick!!");
window.alert("Bienvenido al chat de CHUCK NORRIS " + nick + " !!");
const display = document.getElementById("display");
const Mensaje = document.getElementById("Mensaje");
const msg_nick = document.getElementById("msg_nick");

let tututun = new Audio('tututun.mp3');

const my_socket = io();

