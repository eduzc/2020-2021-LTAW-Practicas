//Proceso de renderizado

const electron = require('electron');


console.log("Hola desde el index.js!!");

//Obtenemos elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const node_v = document.getElementById("node_v");
const chrome_v = document.getElementById("chrome_v");
const electron_v = document.getElementById("electron_v");
const direccion_ip = document.getElementById("direccion_ip");
const info_n_usuarios = document.getElementById("info_n_usuarios");
const print = document.getElementById("print");

node_v.textContent = process.versions.node;
chrome_v.textContent = process.versions.chrome;
electron_v.textContent = process.versions.electron;

let n_usuarios = 0;
info_n_usuarios.innerHTML = n_usuarios;

btn_test.onclick = () => {
    display.innerHTML +=  "PROBANDO" + '</p>';
    console.log("Botón apretado!");

};

electron.ipcRenderer.on('ip', (event, message) => {
    console.log("Dirección ip: " + message);
    direccion_ip.innerHTML = message;
});

electron.ipcRenderer.on('info_n_usuarios', (event, message) => {
    console.log("Usuarios: " + message);
    info_n_usuarios.innerHTML = message;
});



