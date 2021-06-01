// Definimos las constantes 
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
let n_usuarios = 0;
const app = express();
const server = http.Server(app);
// Definimos el puerto y la IP
const PUERTO = 9000;
let end_address =  "/chat.html"
let address = 'http://' + ip.address()+ ':'+ PUERTO + end_address;
console.log(address)
let win = null;
let direccion_ip = ip.address();
console.log("IP de la máquina: " + direccion_ip);
let public_chat = '/cliente/chat.html';
// Definimos los mensajes de notificación
var nueva_conexion = ("CHUCK NORRIS TE SALUDA");
var desconexion = ("UN USUARIO SE HA DESCONECTADO");
var bienvenida = ("BIENVENIDO AL CHAT DE CHUCK NORRIS");

// Definición de eventos
var disconnect = 'disconnect';
var connect = 'connect';


// Electron
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //creamos ventana principal de la app
    win = new electron.BrowserWindow({
        widht: 660, // Anchura
        height: 500, // Altura

        //permitimos que la ventana tenga acceso al sisitema
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false
        }
    });

    win.loadFile("index.html");
    win.on('ready-to-show', () => {
        win.webContents.send('ip', address);
        console.log("Dirección URL: " + address);
    });
});
electron.ipcMain.handle('test', (event,msg) => {
    console.log(">> Mensaje: " + msg);
    io.send(msg);
});

const io = socket(server); 
// Escuchamos en el puerto 
server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);
app.get('/', (req, res) => {
    path = __dirname + public_chat;
    res.sendFile(path);
});


app.use('/', express.static(__dirname + '/'));

app.use(express.static('cliente'));

io.on (connect, (socket) => {
    console.log (nueva_conexion.blue);
    socket.send(bienvenida);

    n_usuarios += 1;
    win.webContents.send('info_n_usuarios', n_usuarios);


    socket.on(disconnect, function(){
        console.log('Fin de la conexion'.yellow);

       io.send(desconexion);
    
        n_usuarios -= 1;
        win.webContents.send('info_n_usuarios', n_usuarios);
    });

    // Definición de comandos de CHUCK NORRIS
    socket.on("message", (msg) => {
        if (msg.split(': ')[1].startsWith('/')) {
            switch (msg.split(': ')[1]) {
                case '/help':
                    msg = 'Necesitas ayuda de CHUCK NORRIS?' + "<br>" +
                    '/list : Devuelve el número de usuarios conectados' + "<br>" +
                    '/hello : Devuelve un saludo de CHUCK NORRIS' + "<br>" +
                    '/date : Devuelve la fecha actual';
                    io.emit('message', msg);
                    break;
                case '/hello':
                    msg = 'CHUCK_NORRIS: Bienvenido a mi chat ';
                    io.emit('message', msg);
                    break;
                case '/date':
                    let d = new Date();
                    let yy = d.getFullYear();
                    let mm = d.getMonth();
                    let dd = d.getDate();
                    msg = 'CHUCK NORRIS: ' + dd + '/' + mm + '/' + yy;
                    io.emit('message', msg);
                    break                  
                case '/list':
                    msg = 'Número de usuarios conectados: ' + n_usuarios ;
                    io.emit('message', msg);
                    break;
                default:
                    
                    break;
            }
        } else {
            console.log("Mensaje Recibido!: " + msg.red);
            io.send(msg);
            win.webContents.send('message', msg);
        }
    });
});

















