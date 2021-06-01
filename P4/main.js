// Definimos las constantes 
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
let n_usuarios = 0;
const app = express();
const server = http.Server(app);
// Definimos el puerto 
const PUERTO = 8080;
let end_address =  '/michat/index.html'
let address = 'http://' + ip.address()+ ':'+ PUERTO + end_address;
console.log(address)
let win = null;
let direccion_ip = ip.address();
console.log("IP de la máquina: " + direccion_ip);
let public_chat = '/public/chat.html';
// Definimos los mensajes de notificación
var nueva_conexion = ("CHUCK NORRIS TE SALUDA");
var desconexion = ("UN USUARIO SE HA DESCONECTADO");
var bienvenida = ("BIENVENIDO AL CHAT DE CHUCK NORRIS");

// Definición de eventos
var disconnect = 'disconnect';
var connect = 'connect';



const io = socket(server); 
// Escuchamos en el puerto 
server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);
//------- PUNTOS DE ENTRADA A LA APP WEB
app.get('/', (req, res) => {
    path = __dirname + public_chat;
    res.sendFile(path);
});









