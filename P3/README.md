 # Práctica 3

En esta práctica se nos pide crear un chat de tal forma que varios usuarios puedan conectarse a un servidor y mantener una conversación entre ellos. También se nos pide introducir unos comandos especiales que luego explicaré.

###  Funcionamiento
Utilizaremos node.js, tendremos que instalar los modulos
* express
* socket.io
 
Para iniciar en un terminal ejecutamos node chat-server.js, previamente tendremos que haber definido un numero de puerto, en este caso he usado el 9000.

Para concectarnos al chat tendremos que abrir un navegador y poner localhost:9000.

Comandos especiales:
* /help: Nos devuelve una lista de comandos soportados
* /hello: Chuck norris nos devolverá un saludo
* /date: Nos da la fecha
* /list: Devuelve el número de usuarios conectados

Utilizaremos socket para activar los procesos de llamada, tambien lo usaremos para escuchar eventos como el de enviar mensajes.
###  Mejoras
Algunas de las mejoras que he implementado ha sido activar un audio cada vez que se manda un mensaje, no obstante he dejado esta linea comentada ya que tendríamos que instalar algunos módulos.
Otra mejora que he implementado ha sido el dar la hora cada vez que se envía y recibe un mensaje así como el poder usar nicknames.







