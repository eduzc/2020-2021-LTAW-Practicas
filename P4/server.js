const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PUERTO = 8000

let n_usuarios = 0;
let content;

// Lanzamos Server.
http.listen(PUERTO, function(){
  console.log('Server lanzado en el puerto ' + PUERTO)
});

// NUEVA CONEXIÓN.
io.on("connection", function(socket){
  console.log("Nuevo usuario conectado!!");

  n_usuarios += 1;
  let random_number =  Math.floor((Math.random() * 100000) + 1);
  socket.id = "User_" + random_number

  console.log("ID del usuario: " + socket.id)
  console.log("Número de usuarios en el chat: " + n_usuarios);

  // Enviar mensaje de bienvenida al nuevo usuario
  socket.emit("new_message", "Hola " + socket.id + ". Bienvenido a mi chat.</i>"); 

  // Anuncio del nuevo usuario
  io.emit("new_message", "El usuario " + socket.id + " se ha conectado al chat"); 
  console.log("Client: " + socket.id + " connected.")
  io.emit('hello', "Tu nick es: " + socket.id );
  

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on("new_message", msg => {

    //-- Notificarlo en la consola del servidor
    console.log("Mensaje recibido " + msg)

    // Definición de comandos
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
  console.log("El usuario " + socket.id + ' se ha desconectado');
  n_usuarios -= 1;
  console.log("Número de usuarios en el chat: " + n_usuarios);
  });
});
