// Definimos las constantes
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PUERTO = 9000
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
  console.log("Cargando Página principal ...")
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
      // Mensajes
      let nuevo_cliente = "El usuario " + username + " se ha conectado!! "
      let adios_cliente = "El usuario " + username + " se ha desconectado!! "
      let saludos = "Tu nick es: " + username
      // Notificación de que un usuario se ha conectado
      io.emit('new_message', nuevo_cliente);
      // Notificamos en consola el usuario conectado  
      console.log(nuevo_cliente)
      socket.emit('hello', saludos);
 
      // Detección de mensajes 
      n_usuarios += 1;
      socket.on('new_message', msg => {
      //tututun.play();
 
      //  Notificamos en consola el mensaje recibido 
      console.log("Mensaje recibido: " + msg)
 
      // Definicion de comandos 
      switch (msg) {
        case "/help":
          msg = 'Necesitas ayuda de CHUCK NORRIS?' + "<br>" +
              '/list : Devuelve el número de usuarios conectados' + "<br>" +
              '/hello : Devuelve un saludo de CHUCK NORRIS' + "<br>" +
              '/date : Devuelve la fecha actual';
          io.emit('new_message', msg);
          break;
        case "/hello":
          msg = 'CHUCK_NORRIS: Bienvenido a mi chat';
          io.emit('new_message', msg);
          break
        case "/date":
          let d = new Date();
          let yy = d.getFullYear();
          let mm = d.getMonth();
          let dd = d.getDate();
          msg = 'SERVER: ' + dd + '/' + mm + '/' + yy;
          io.emit('new_message', msg);
          break
        case "/list":
          msg = 'Número de usuarios conectados: ' + n_usuarios;
          io.emit('new_message', msg);
          break
        default:
          let d2 = new Date();
          let h = d2.getHours();
          let m = d2.getMinutes();
          let s = d2.getSeconds();
          let time = '[' + h + ':' + m + ':' + s +']'
          io.emit('new_message', time + username +': ' + msg);
      }
    });
    // Desconexión de usuario

    socket.on('disconnect', function(){
      io.emit('new_message',adios_cliente);
    // Notificación por consola
      console.log(adios_cliente);
      n_usuarios -= 1;
    });
  });
});
 
