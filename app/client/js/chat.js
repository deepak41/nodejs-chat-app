let username = localStorage.getItem('username');
let room = localStorage.getItem('room');

// Connect to the server.
// If frontend & server both are served on the same domain, no need to specify server url
const socket = io();

// Join chat room
socket.emit('join-room', { username, room });

// Get room and users
socket.on('room-users', ({ room, users }) => {
	outputRoomName(room);
	outputUsers(users);
});

// Chat message from server
socket.on('message', (message) => {
	renderMessage(message);
	// Scroll down when new messages come
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Display if a user is typing
socket.on('typing', (user) => {
	showTypingStatus(true);
	typingStatus.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

// Display if a user has stopped typing
socket.on('done-typing', (user) => {
    showTypingStatus(false)
})
