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

