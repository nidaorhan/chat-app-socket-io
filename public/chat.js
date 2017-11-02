var socket = io.connect('http://localhost:4000')

var message  = document.getElementById('message'),
    username = document.getElementById('username'),
    btn      = document.getElementById('send'),
    output   = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    group    = document.getElementById('select');

/*----------  Emit and listen events  ----------*/

btn.addEventListener('click', function() {
	socket.emit('new message', {
		message : message.value,
		username: username.value
	})
})

message.addEventListener('keypress', function() {
	socket.emit('typing', {
		username: username.value
	})
})

// listen for events emitted by server
socket.on('new message', function(data) {
	output.innerHTML = '<p><strong> ' + data.username + '</strong>: ' + data.message + '</p>'
	feedback.innerHTML = ''
})

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data.username + ' is typing...</em></p>'
})

/*----------  Emit and listen events  ----------*/



/*----------  Count the connected users  ----------*/

socket.on('stats', function(data) {
    console.log('Connected clients:', data.numClients)
})

/*----------  Count the connected users  ----------*/











