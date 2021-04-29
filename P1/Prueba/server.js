const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 9000

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'png'  : 'image/png',
   };
//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  var q = url.parse(req.url, true);
  console.log("Recurso solicitado (URL): " + req.url)
  console.log("Recurso:" + q.pathname)

  var filename = "";

  //-- Obtener fichero a devolver
  if (q.pathname == "/")
    filename += "index.html"
  else {
    filename = q.pathname;
  }

  //-- Leer fichero
  fs.readFile(filename, function(error, data) {

    //-- Mensaje de error
    if (error) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write("Error 404 Not Found");
      return res.end();
    }else{

   