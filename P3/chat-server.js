// Definimos las constantes
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PUERTO = 9090
// En caso de tener la carpeta de node funcionaría el audio
// let tututun = new Audio('tututun.mp3');

let n_usuarios = 0;
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
 
// Notificación de NUEVA CONEXIÓN.
io.on('connection', function(socket){
 
  //  Detección de usuario nuevo
  socket.on('new_client', username =>{
      // Notificación de que un usuario se ha conectado
      io.emit('new_message',"El usuario " + username + " se ha conectado!! ");
     //  Notificamos en consola el usuario conectado  
      console.log("Client: " + username + " connected.")
      socket.emit('hello', "Tu nick es: " + username );
 
      // Detección de mensajes 
      n_usuarioss += 1;
      socket.on('new_message', msg => {
      //tututun.play();
 
      });
    })})
