function main() {
    // Introducción
    let username = prompt("Introduce tu nick!!");
    window.alert("Bienvenido al chat de CHUCK NORRIS " + username + " !!");
    console.log("Bienvenido al chat de CHUCK NORRIS") 
    
    // Websocket
    const display = document.getElementById("display");
    const msg = document.getElementById("msg");
    const send = document.getElementById("send");
    const socket = io();
   
    // Notificación de conexión de clientes
    socket.emit('new_client', username);
    console.log("El usuario " + username + " se ha conectado");
   
    // Envio de mensajes
    send.onclick = () => {
      socket.emit('new_message', msg.value);
      console.log("Mensaje mandado")
      msg.value="";
    }
   
    // Mostrar mensaje del servidor.
    socket.on('new_message', msg => {
      display.innerHTML += msg + '<br>';
    });
   
  }
   
  
  