const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PUERTO = 9000

let n_usuarios = 0;

//const info7 = document.getElementById("info7");

//const colors = require('colors');
const ip = require('ip');
infonode = process.versions.node;
infochrome = process.versions.chrome;
infoelectron = process.versions.electron;

// Lanzamos Server.
http.listen(PUERTO, function(){
console.log('Server lanzado en el puerto ' + PUERTO)
let address = 'http://' + ip.address()+ ':'+ PUERTO + '/public_chat/index.html';
console.log(address)
console.log(infonode)
console.log(infochrome)
console.log(infoelectron)

//info7.textContent = address;


});

// NUEVA CONEXIÓN.
io.on("connection", function(socket){
  // Generamos un nuevo nombre de usuario
  n_usuarios += 1;
  let random_number =  Math.floor((Math.random() * 100000) + 1);
  socket.id = "User_" + random_number

  console.log("ID del usuario: " + socket.id)
  console.log("Número de usuarios en el chat: " + n_usuarios);

  // Anuncio del nuevo usuario
  io.emit("new_message", "El usuario " + socket.id + " se ha conectado al chat"); 
  console.log("Client: " + socket.id + " connected.")

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on("new_message", msg => {

    //-- Notificarlo en la consola del servidor
    console.log("Mensaje recibido " + msg)

    // Definición de comandos de CHUCK NORRIS
    switch (msg) {
      case "/help":
        msg = 'Necesitas ayuda de CHUCK NORRIS?' + "<br>" +
            '/list : Devuelve el número de usuarios conectados' + "<br>" +
            '/hello : Devuelve un saludo de CHUCK NORRIS' + "<br>" +
            '/date : Devuelve la fecha actual';
        io.emit('new_message', msg);
        break;
      case "/hello":
        msg = 'CHUCK_NORRIS: Bienvenido a mi chat ' + socket.id;
        io.emit('new_message', msg);
        break
      case "/date":
        let d = new Date();
        let yy = d.getFullYear();
        let mm = d.getMonth();
        let dd = d.getDate();
        msg = 'SERVER: ' + socket.id + dd + '/' + mm + '/' + yy;
        io.emit('new_message', msg);
        break
      case "/list":
        msg = 'Número de usuarios conectados: ' + n_usuarios ;
       
        io.emit('new_message', msg);
        break
      default:
        let d2 = new Date();
        let h = d2.getHours();
        let m = d2.getMinutes();
        let s = d2.getSeconds();
        let time = '[' + h + ':' + m + ':' + s +']'
        io.emit('new_message', time + socket.id +': ' + msg);
    
    };
  })

// Desconexión de usuario
  socket.on("disconnect", function(){
    io.emit("new_message", "El usuario " + socket.id + " se ha desconectado"); 
 
  // Notificación por consola
    console.log(" ");
    console.log("El usuario " + socket.id + " se ha desconectado");
    n_usuarios -= 1;
    console.log("Número de usuarios en el chat: " + n_usuarios);
    });
  });
