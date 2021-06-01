let insert = "Introduce tu nick!!"
let bienvenida = "Bienvenido al chat de CHUCK NORRIS "

function main() {
    // Introducción de nick en el navegador
    let username = prompt(insert);
    window.alert(bienvenida + username + " !!");
    console.log(bienvenida) 
    
    // Definición de constantes
    // Websocket
    const display = document.getElementById("display");
    const msg = document.getElementById("msg");
    const send = document.getElementById("send");
    const socket = io();
   
    // Notificación de conexión de clientes por nombre de usuario
    socket.emit('new_client', username);
    console.log("El usuario " + username + " se ha conectado");
   
    // Envio de mensajes
    send.onclick = () => {
      socket.emit('new_message', msg.value);
      console.log("Mensaje mandado")
      msg.value="";
    }
   
    // Mostrar mensajes
    socket.on('new_message', msg => {
      display.innerHTML += msg + '<br>';
    });
   
  }
   
  
  