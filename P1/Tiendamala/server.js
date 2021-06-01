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
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)

  var filename = "." + q.pathname;

  //-- Obtener fichero a devolver
  if (q.pathname == "/")
    filename += "index.html"

  //-- Leer fichero
  fs.readFile(filename, function(error, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (error) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      console.log("ERROR!!")
      petition = "error.html";
    }else{

    //-- Tipo mime por defecto: html
    //let mime = "text/html"

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  }});

}).listen(PUERTO);

console.log("Ejecutando Server...")
console.log("Puerto: " + PUERTO)