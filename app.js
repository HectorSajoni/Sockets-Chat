
const express = require('express');
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')

let puerto = process.env.PORT || 8080

app.use(express.static('public'));
app.use(bodyParser.json())
server.listen(puerto, () => console.log('Servidor iniciado en '+ puerto));

app.use(bodyParser.urlencoded(
  {
      extended:true
  }
))

app.get('/', function (req, res) 
{
  res.sendFile(__dirname + '/public/inicio.html');
});

app.post('/chat', (req, res)=>
{
  usuario = req.body.nombreDeUsuario
  user = usuario.split('')
  for(var i = 0; i<user.length; i++)
  {
    console.log("validando esto")
    if(user[i] == '<' || user[i] == '>'){
      console.log("falso")
      return res.redirect('/')
    }
  }
  res.send
  (`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="style.css">
        <title>Chat</title>
      </head>
    
      <body >
        <input type="hidden" id="usuario" value="`+usuario+`">
        <center><h1>Chat de `+usuario+`</h1></center>
        <br>
    
        <div class="main">
    
          <div class="card">
            <div id="mensajes"></div>
          </div>
    
          <div class="fondo">
            <input
              type="text"
              id="mensaje"
              placeholder="Mensaje"
              class="text-success"
              required/>
            <button class="btn btn-primary" id="enviar">Enviar</button>
          </div>
        </div>
    
        <script src="js/socket.io.js"></script>
        <script src="js/logica.js" charset="utf-8"></script>
       
      </body>
    </html>    
    `)

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
