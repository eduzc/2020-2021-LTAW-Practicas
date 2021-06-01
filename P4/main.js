const electron = require('electron')

// Notificamos que electron se abre
console.log("Iniciando electron")
// Notificamos que la app se abre

electron.app.on('ready', ()=>{
  console.log("App Ready!")

  win = new electron.BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadFile('index.html')
})