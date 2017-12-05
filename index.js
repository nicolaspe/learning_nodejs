var express 	= require('express');
var app 			= express();													// express server
var http 			= require('http').createServer(app);	// http server
var webSocket	= require('ws').Server;								// websocket server
var io 		= require('socket.io')(http);
var path 			= require('path');
var port 			= process.env.PORT || 3000;

var _mode = 0;


// static html
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req,res) {
	res.render(__dirname + '/public/external.html');
	io.emit('new mode', _mode);
});


// 404 response
app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})


// server setup
//		listen for http connections
http.listen(port, () => {
	console.log('Example app listening on port ', port);
});


// web socket setup
//		listen for web socket messages
wss = new webSocket({ server: http });

wss.on('connection', (ws_client) => {
	console.log("user connected");

	// mode change
	ws_client.on('mode', function(mode){
		console.log("mode" + mode);
		_mode = mode;
	});
	// message handling
	ws_client.on('message', function(msg){
		console.log("msg: " + msg);
		ws_client.send("Hi! You sent: " + msg);
		// check if the values are valid
		let intComing = parseInt(msg);
		if(intComing != NaN && intComing>=0 && intComing<=5){
			_scene = parseInt(msg)
			broadcast(_scene);
			console.log("change scene emited: " + _scene);
		}
	});
	// error handling
	ws_client.on('error', function(err){
		console.log(err);
	});
	// disconnection
	ws_client.on('close', () => {
		console.log("user disconnected");
	});
})

function broadcast(msg){
	wss.clients.forEach(function each(client) {
		client.send(msg);
    // if (client.readyState === WebSocket.OPEN) {
    //   client.send(msg);
    // }
  });
}

// socket.io setup -- deprecated
/*
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
*/
