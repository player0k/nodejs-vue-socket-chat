const express = require('express')
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 80

app.set('views', './templates')
app.set('view engine', 'pug');
app.disable('x-powered-by');
app.use(helmet())
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.render('index',{ socketUrl:`"127.0.0.1:${port}"` });
});


io.on('connection', function (socket) {
  socket.on('send_chat_message',function (data) {
    io.emit('chat_message', data)
  })
});


server.listen(port,function () {
  console.log(`Server app started on port ${port}!`)
})

