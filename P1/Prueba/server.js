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

  