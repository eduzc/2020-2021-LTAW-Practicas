const io = require('socket.io-client');
const socket = io('http://localhost:9000');
const v_node = document.getElementById("info1");
const v_chrome = document.getElementById("info2");
const v_electron = document.getElementById("info3");

function main()
{

  // Obtener los elementos del interfaz
  const display = document.getElementById('display');
  const msg = document.getElementById("msg");
  const send = document.getElementById('send');

  // Mensaje a enviar

  msg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click()
      
    }
  });

  // Envio de mensajes y autoborrado
  send.onclick = () => {
    socket.emit('new_message', msg.value);
    console.log("Mensaje mandado")
    msg.value="";
  }
  
  // Mostrar mensaje
  socket.on('new_message', msg => {
    display.innerHTML += msg + '<br>';    
    console.log("Mensaje recibido: " + msg)
  });


}
