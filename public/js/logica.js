
var socket = io();
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let contenido = document.getElementById('contenido');
let notificaciones = document.getElementById('notificaciones');
let botonEnviar = document.getElementById('enviar');

var clientes = [];

botonEnviar.addEventListener('click', function () 
{
  var data = 
  {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };

  if (mensaje.value === '' || usuario.value === '') 
  {
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  } else 
  {
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});

socket.on('chat:mensaje', function (data) {
  contenido.innerHTML +=
    '<p><strong>' + data.usuario + '</strong>: ' + data.mensaje + '</p>';
  notificaciones.innerHTML = '';
});

socket.on('socket_desconectado', function (data) {
  console.log(data);
  clientes = clientes.filter(function (cliente) {
    console.log(cliente);
    return cliente.id != data.id;
  });
});

socket.on('socket_conectado', function (data) {
  console.log("Socket conectado")
  console.log(data);
});
