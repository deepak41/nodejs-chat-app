const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const typingStatus = document.querySelector('.typing-status');

// To send message in chat room
function sendMessage(message) {
	message = message.trim();
	if(!message)
		return false;
	// Emit message to server
	socket.emit('chat-message', message);
	// Clear input field
	document.getElementById('msg').value = "";
	document.getElementById("msg").focus();
}

// Output chat message to DOM
function renderMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	const p = document.createElement('p');
	p.classList.add('meta');
	p.innerText = message.username;
	p.innerHTML += `<span>${message.time}</span>`;
	div.appendChild(p);
	const para = document.createElement('p');
	para.classList.add('text');
	para.innerText = message.text;
	div.appendChild(para);
	chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
	roomName.innerHTML = '<i class="fas fa-igloo"></i> ' + room;
}

// Add users in the room to DOM
function outputUsers(users) {
	userList.innerHTML = '';
	users.forEach((user) => {
		const li = document.createElement('li');
		li.innerText = user.username;
		userList.appendChild(li);
	});
}

// Prompt the user before exiting chat room
function exitRoom() {
	const response = confirm('Are you sure you want to exit the chatroom?');
	if(response)
		window.location.replace('/');
}

// Sending username if the user is typing
function typing(e) {
	if(e.keyCode != 13)
		socket.emit('typing', { username, room });
}

// Sending username if the user has stopped typing
let typingTimer;
function doneTyping() {	
	clearTimeout(typingTimer);
	typingTimer = setTimeout(() => {
		socket.emit('done-typing', { username, room });
	}, 700);    // 700 ms
}

// To show/hide typing-status div in chat page
function showTypingStatus(show) {
	if(show == true)
		typingStatus.style.display = "block";
	else
		typingStatus.style.display = "none";
}
