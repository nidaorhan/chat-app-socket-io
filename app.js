var express = require('express')
var socketio = require('socket.io')

var app = express()

var server = app.listen(4000, function() {
	console.log('server is listening port 4000')
})

app.use(express.static('public'))



var io = socketio(server)

/*----------  Emit and listen events  ----------*/

io.on('connection', function(socket) {
	
	// listen for events emitted by clients
	socket.on('new message', function(data) {
		// emit events to all clients
		io.sockets.emit('new message', data)
	})
		
	socket.on('typing', function(data) {
		// emit events to all clients except for the sender
		socket.broadcast.emit('typing', data)
	})

})

/*----------  Emit and listen events  ----------*/




/*----------  Count the connected users  ----------*/

var numClients = 0

io.on('connection', function(socket) {  
  numClients++
  io.emit('stats', { numClients: numClients })

  socket.on('disconnect', function() {
      numClients--
      io.emit('stats', { numClients: numClients })
  })
})

/*----------  Count the connected users  ----------*/




/*----------  Rooms  ----------*/

// io.sockets.on('connection', function(socket) {
//   socket.on('room', function(room) {
//     socket.join(room);
//     socket.on('new message', function(data) {
// 			io.to(room).emit('new message', data);
// 		})
// 		socket.on('typing', function(data) {
// 			socket.broadcast.to(room).emit('typing', data)
// 		})
//   });
// });



/*----------  Rooms  ----------*/










