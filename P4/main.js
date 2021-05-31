const electron = require('electron')
var ip = require("ip");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
console.log("Arrancando electron...")

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;
info7.textContent = ip.address() + ":9000/chat.html";
electron.app.on('ready', ()=>{
  console.log("Evento Ready!")

  // Crear la ventana principal de nuestra Interfaz Gráfica
  win = new electron.BrowserWindow({
    width: 600,
    height: 400
  })

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar la interfaz gráfica, que se encuentra en el
  //-- fichero index.html
  win.loadFile('index.html')
})