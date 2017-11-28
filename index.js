var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/three', express.static(__dirname + '/node_modules/three/build'));


// app.get('/', (req,res) => res.send('Hello world!'));
app.get('/', function(req,res) {
});

// 404 response
app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})


let server = http.listen(3000, () => {
	console.log('Example app listening on port ', server.address().port);
});

io.on('connection', function(socket) {
	console.log("User connected");
	socket.on('disconnect', function(){
		console.log("User disconnected");
	})
	socket.on('mode', function(mode){
		io.emit('new mode', mode);
		console.log("received mode: " +mode);
	});
})

// app.get('/mode', (req,res) => {
// 	res.send("hi");
// 	console.log("hi");
// });
//
// app.post('/mode', (req, res) => {
// 	console.log(req.body);
// 	io.emit('mode', req.body);
// 	res.sendStatus(200);
// });
