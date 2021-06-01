 # Práctica 4

Esta práctica es parecida a la anterior, sin embargo se nos pedirá realizar el chat en forma de aplicación, para ello usaremos electron

###  Funcionamiento
Utilizaremos node.js, tendremos que instalar los modulos
* express
* socket.io
 
Lo primero es instalar los modulos en la carpeta que descargemos los ficheros, para ello usaremos npm install, posteriormente lo que he hecho es incluir la versión del navegador, node e ip del usuario a la que nos tenemos que conectar para poder acceder al chat.

También he incluido un boton de testeo.

Una vez

Para concectarnos al chat tendremos que abrir un navegador y poner localhost:9000.

Comandos especiales:
* /help: Nos devuelve una lista de comandos soportados
* /hello: Chuck norris nos devolverá un saludo
* /date: Nos da la fecha
* /list: Devuelve el número de usuarios conectados

Utilizaremos socket para activar los procesos de llamada, tambien lo usaremos para escuchar eventos como el de enviar mensajes.
###  Mejoras
Algunas de las mejoras que he implementado ha sido activar un audio cada vez que se manda un mensaje, 
Otra mejora que he implementado ha sido el dar la hora cada vez que se envía y recibe un mensaje así como el poder usar nicknames.







