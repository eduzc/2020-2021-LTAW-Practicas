// Definicion de constantes
// Pedimos el nick del usuario
let nick = prompt("Introduce tu nick!!");
window.alert("Bienvenido al chat de CHUCK NORRIS " + nick + " !!");
const display = document.getElementById("display");
const Mensaje = document.getElementById("Mensaje");
const msg_nick = document.getElementById("msg_nick");

let tututun = new Audio('tututun.mp3');

const my_socket = io();

let d2 = new Date();
let h = d2.getHours();
let m = d2.getMinutes();
let s = d2.getSeconds();  
let time = '[' + h + ':' + m + ':' + s +']'


my_socket.on("message", (msg)=> {
  display.innerHTML += '<p style="color:black">' + msg + '</p>';
  tututun.play();
});

