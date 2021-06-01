///-- Modulos utilizados
const http = require('http');
const url = require('url');
const fs = require('fs');
 
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
 
//-- Array con los productos disponibles en la tienda
//-- Usamos un array, pero podría ser un objeto genérico
//-- Por simplicidad lo inicializamos con valores constantes, pero
//-- en una aplicación real este array se obtendría de la base
//-- de datos
let productos = {
  "Eléctricas": ["GUIT ARCH", "GUIT GIBSON", "GUIT SG", "GUIT FENDER"],
  "Bajos": ["FENDER 70s", "JACKSON CBX", "LAKLAND SKYLINE", "FENDER 75"],
  "Acústicas": ["GIBSON ACOUSTIC", "TAYLOR ACOUSTIC", "HB ACOUSTIC"],
  "Cabezales": ["CABEZAL ORANGE", "CABEZAL MARSHALL", "CABEZAL RECTIFIER","CABEZAL EVH" ],
  "Pantallas": ["CAB 1", "CAB 2", "CAB 3", "CAB 4"],
};
 
const datos = {
  "nombre": "",
  "email" : "",
  "localidad": "",
  "articulos": [],
  "total" : 0.0
}
 
//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  let q = url.parse(req.url, true);
  let parametros = q.query;
  let cookie = req.headers.cookie;
  console.log("Recurso:" + q.pathname)
 
  var filename = "." + q.pathname;
 
  //-- Obtener fichero a devolver
  if (q.pathname == "/"){
    filename += "index.html"
  }
 
  let extension = filename.split(".")[filename.split(".").length-1];
  let mime = "";
  let guitarra = [];
 
  switch (extension) {
    case "html":
    case "css":
      mime = "text/" + extension;
      break;
    case "png":
    case "jpg":
    case "ico":
      mime = "image/" + extension;
      break;
    case "js":
      mime = "application/javascript";
      break;
    case "busqueda":
      for (let tipo in productos) {
        for (var i = 0; i < productos[tipo].length; i++) {
          if (productos[tipo][i].toLowerCase().indexOf(parametros.guitarra.toLowerCase())!= -1) {
            guitarra.push([productos[tipo][i], tipo])
          }
        }
      }
      res.setHeader("Content-Type","application/json")
      res.write(JSON.stringify(guitarra))
      res.end()
      break;
    case "carrito":
      let email = parametros.email.replace("@", "%40")
      let datacookie = {}
      if (cookie) {
        for (let c in cookie.split("; ")) {
          if (cookie.split("; ")[c].split("=")[0] == email) {
            datacookie = JSON.parse(cookie.split("; ")[c].split("=")[1])
          }
        }
      }
      res.setHeader("Content-Type","application/json")
      res.write(JSON.stringify(datacookie))
      res.end()
      break;
    case "compra":
      if (req.method == "POST") {
        req.on("data" , chunk => {
          let data = chunk.toString()
          let registrarse = false;
          let email = data.split("&")[0].split("=")[1]
          let guitarra = data.split("&")[1].split("=")[1]
          let precio = data.split("&")[2].split("=")[1]
          let datacookie = {}
          let filename = ""
          if (cookie) {
            for (let c in cookie.split("; ")) {
              if (cookie.split("; ")[c].split("=")[0] == email) {
                registrarse = true;
                datacookie = JSON.parse(cookie.split("; ")[c].split("=")[1])
              }
            }
          }
          if (!registrarse) {
            filename = "./registro.html"
          }else {
            datacookie["articulos"].push(guitarra)
            datacookie["total"] += parseFloat(precio)
            res.setHeader("Set-Cookie", email + "=" + JSON.stringify(datacookie))
            filename = "./index.html"
          }
          fs.readFile( filename, function(err, data) {
 
            //-- Fichero no encontrado. Devolver mensaje de error
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("ERROR 404 Not Found");
            }
 
            //-- Generar el mensaje de respuesta
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
          });
          return
        })
      }
      break;
    case "register":
      if (req.method == "POST") {
        req.on("data", chunk => {
          let data = chunk.toString()
          let nombre = data.split("&")[0].split("=")[1]
          let email = data.split("&")[1].split("=")[1]
          let localidad = data.split("&")[2].split("=")[1]
          let registrarse = false;
          let datacookie = {}
          let filename = "./index.html"
          if (cookie) {
            for (let c in cookie.split("; ")) {
              if (cookie.split("; ")[c].split("=")[0] == email) {
                registrarse = true;
              }
            }
          }
          if (!registrarse) {
            datacookie = datos
            datacookie["nombre"] = nombre
            datacookie["email"] = email
            datacookie["localidad"] = localidad
            res.setHeader("Set-Cookie",email + "=" + JSON.stringify(datacookie))
          }
          fs.readFile( filename, function(err, data) {
 
            //-- Fichero no encontrado. Devolver mensaje de error
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Not Found");
            }
 
            //-- Generar el mensaje de respuesta
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            res.end();
            return;
          });
          return
        })
      }
      break;
    default:
      mime = "text/html";
  }
 
  if (q.pathname.indexOf("action") == -1 ) {
    fs.readFile(filename, function(err, data) {
 
      //-- Fichero no encontrado. Devolver mensaje de error
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
 
      //-- Generar el mensaje de respuesta
      res.writeHead(200, {'Content-Type': mime});
      res.write(data);
      res.end();
    });
  }
 
}).listen(PUERTO);
 
console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)