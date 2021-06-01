// Definimos las constantes
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PUERTO = 9090
// En caso de tener la carpeta de node funcionaría el audio
// let tututun = new Audio('tututun.mp3');

// Lanzamos Server.
http.listen(PUERTO, function(){
  console.log('Server lanzado en el puerto ' + PUERTO);
});
 
// Página del servidor
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});
 
// Página del cliente
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero solicitado")
});
 
// Utilizamos css para dar estilo a la pagina
app.get('/chat.css', function(req, res){
  res.sendFile(__dirname + '/chat.css');
  console.log("Fichero solicitado")
});
 


 
