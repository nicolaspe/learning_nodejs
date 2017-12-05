var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');
var path = require('path');
var port = process.env.PORT || 3000;

var _mode = 0;


app.use(express.static(path.join(__dirname, 'public')));
app.set('/three', express.static(path.join(__dirname, '/node_modules/three/build')));


// app.get('/', (req,res) => res...;
app.get('/', function(req,res) {
	res.render(__dirname + '/public/external.html');
	io.emit('new mode', _mode);
});

// 404 response
app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})

http.listen(port, () => {
	console.log('Example app listening on port ', port);
});

io.on('connection', function(socket) {
	console.log("User connected");
	socket.on('disconnect', function(){
		console.log("User disconnected");
	})
	socket.on('mode', function(mode){
		_mode = mode;
		io.emit('new mode', _mode);
		console.log("received websocket mode: " +_mode);
	});
})

var server = net.createServer(function(tcp){
	tcp.on('select', function(mode){
		io.emit('new mode', _mode);
		console.log("received tcp mode: " +_mode);
	});
});

server.listen(8080, '127.0.0.1');
// server.listen(80, '127.0.0.1', () => {
// 	console.log('Example tcp app listening on port 80');
// });
