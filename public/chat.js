var socket = io.connect('http://localhost:4000')

var message  = document.getElementById('message'),
    username = document.getElementById('username'),
    btn      = document.getElementById('send'),
    output   = document.getElementById('output'),
    feedback = document.getElementById('feedback');


btn.addEventListener('click', function() {
	socket.emit('new message', {
		message : message.value,
		username: username.value
	})
})

socket.on('new message', function(data) {
	output.innerHTML = '<p><strong> ' + data.username + '</strong>: ' + data.message + '</p>'
	feedback.innerHTML = ''
})

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data.username + ' is typing...</em></p>'
})

message.addEventListener('keypress', function() {
	socket.emit('typing', {
		username: username.value
	})
})

