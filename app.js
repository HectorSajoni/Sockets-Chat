
const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let puerto = process.env.PORT || 8080

app.use(express.static('public'));
server.listen(puerto, () => console.log('Servidor iniciado en '+ puerto));

app.get('/', function (req, res) 
{
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) 
{
  console.log('socket conectado', socket.id);
  io.emit('conectado', {texto: 'Nuevo socket conectado: ' + socket.id +`<br>`} );

  socket.on('disconnect', () => 
  {
  	console.log('socket desconectado', socket.id);
    io.emit('desconectado', {texto: 'Socket desconectado.'+ socket.id +`<br>`});
  });

  socket.on('chat:mensaje', (data) => 
  {
    io.emit('chat:mensaje', data);
  });

  socket.on('chat:escribiendo', (usuario) => 
  {
    socket.broadcast.emit('chat:escribiendo', usuario);
    //io.emit('chat:mensaje', data); 
  });
});
