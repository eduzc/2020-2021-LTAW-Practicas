// Cargamos las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
let n_usuarios = 0;

const PUERTO = 8080;
let address = 'http://' + ip.address()+ ':'+ PUERTO + '/michat/index.html';
console.log(address)
//creamos la variable para acceder a la ventana principal
let win = null;

//creamos variable para dirección ip
let direccion_ip = ip.address();
console.log("IP de la máquina: " + direccion_ip);


//creamos la variable para cuando el cliente nos pida los comandos /help 
let help = "<p> >> /help: Lista de los comandos soportados</p> \
<p> >> /list: Número de usuarios conectados</p> \
<p> >> /hello: El servidor nos saluda </p> \
<p> >> /date: Devuelve la fecha actual</p>";

// mensaje para cuando el servidor nos saluda
let mensaje_hello = (">>HOLA!! Soy el servidor!");

// mensaje para dar la bienvenida al chat
let mensaje_bienvenida = (">> BIENVENID@!!");

//mensaje de desconexión
let mensaje_desc = (">> UN MIEMBRO DEL CHAT SE HA IDO");

//mensaje de comando no reconocido
let mensaje_norec = (">> Comando no reconocido, inténtalo de nuevo!");

// creamos una nueva app web
const app = express();

// creamos servidor asoaciado a la app de express 
const server = http.Server(app);

// creamos el servidor de websockets, asociado al servidor http
const io = socket(server); 


//------- PUNTOS DE ENTRADA A LA APP WEB
// defino punto de entrada principal (index.html) de la carpeta public
app.get('/', (req, res) => {
    path = __dirname + '/public/chat.html';
    res.sendFile(path);
});

// Esto es necesario para que el servidor le envíe al cliente la
// biblioteca socket.io para el cliente
app.use('/', express.static(__dirname + '/'));

// El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

// Nueva conexión recibida
io.on ('connect', (socket) => {
    console.log ("NUEVA CONEXIÓN!".green);

    // Enviamos el mensaje de bienvenida
    socket.send(mensaje_bienvenida);

    //Mensaje de que se ha conectado un nuevo usuario
    io.send(">> Tenemos un nuevo usuario con nosotros!!");

    // Aumentamos el número de usuarios    
    n_usuarios += 1;
    win.webContents.send('info_n_usuarios', n_usuarios);


    // Evento de desconexión
    socket.on('disconnect', function(){
        console.log('** CONEXIÓN TERMINADA **'.red);

    // Enviamos mensaje de desconexión
       io.send(mensaje_desc);
    
    // Disminuimos el número de usuarios
        n_usuarios -= 1;
        win.webContents.send('info_n_usuarios', n_usuarios);
    });

    // Definición de comandos de CHUCK NORRIS
    socket.on("message", (msg) => {
        console.log ("Mensaje recibido " + msg);
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
                    // No hacer nada, tampoco se reenvía el mensaje.
                    break;
            }
        } else {
            console.log("Mensaje Recibido!: " + msg.blue);
            //-- Reenviarlo a todos los clientes conectados
            io.send(msg);
            win.webContents.send('message', msg);
        }
    });
});



// ------ CREAMOS LA APP DE ELECTRON ------- //

electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //creamos ventana principal de la app
    win = new electron.BrowserWindow({
        widht: 650,
        height: 600,

        //permitimos que la ventana tenga acceso al sisitema
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false
        }
    });

    //cargamos la interfaz gráfica
    let interfaz_grafica = "index.html";
    win.loadFile(interfaz_grafica);

    //Esperar que la pág cargue y enviar el mensaje al proceso 
    //de renderizado para que lo saque por la interfaz gráfica
    win.on('ready-to-show', () => {
        let mensaje_ip = "http://" + direccion_ip + ":" + PUERTO + "/chat.html";
        win.webContents.send('ip', mensaje_ip);
        console.log("Dirección URL: " + mensaje_ip);
    });
});

// creamos proceso para enviar un mensaje a todos los usuarios 
electron.ipcMain.handle('test', (event,msg) => {
    console.log(">> Mensaje: " + msg);
    io.send(msg);
});

// Lanzamos el servidor HTTP y... EMPEZAMOS!
server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);












