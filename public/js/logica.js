
var socket = io();
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let mensajes = document.getElementById('mensajes');
let botonEnviar = document.getElementById('enviar');

var clientes = [];

botonEnviar.addEventListener('click', function () 
{
  if(validar(usuario, mensaje))
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
  }else
  {
    alert("usuario o mensaje no válido")
  }
});

socket.on('chat:mensaje', function (data) {
  mensajes.innerHTML += 
    `<div class="contenido">
      <strong>`+data.usuario+`</strong>
      <div class="mensajes">`+data.mensaje+`</div>
    </div>`;
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

function validar(usuario, mensaje)
{
  user = usuario.value.split('')
  message = mensaje.value.split('')

  for(var i = 0; i<user.length; i++)
  {
    console.log("validando esto")
    if(user[i] == '<' || user[i] == '>'){
      console.log("falso")
      return false
    }
  }
  for(var i = 0; i<message.length; i++)
  {
    console.log("validando esto")
    if(message[i] == '<' || message[i] == '>'){
      console.log("falso")
      return false
    }
  }
  return true
}





