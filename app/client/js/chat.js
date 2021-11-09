const socket = io();

// Join chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users}) => {
	outputRoomName(room);
	outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
	outputMsg(message);

	// Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Displaying if a user is typing
socket.on('typing', (user) => {
	setfeedbackDisplay(true)
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

//Displaying if a user has stopped typing
socket.on('done-typing', (user) => {
    feedback.innerHTML = '';
    setfeedbackDisplay(false)
})
