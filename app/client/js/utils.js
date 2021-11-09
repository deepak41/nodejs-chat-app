const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const feedback = document.querySelector('.feedback');


function sendMsg(msg) {
	msg = msg.trim();
	if(!msg)
		return false;

	// Emit message to server
	socket.emit('chatMessage', msg);

	// Clear input
	document.getElementById('msg').value = "";
	document.getElementById("msg").focus();
}

// Output message to DOM
function outputMsg(message) {
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
	roomName.innerText = room;
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


//Prompt the user before leaving chat room
function leaveRoom() {
	const response = confirm('Are you sure you want to leave the chatroom?');
	if(response) {
		window.location.replace('/');
	}
}


//Sending username if the user is typing
function typing(e) {
	if(e.keyCode != 13)
		socket.emit('typing', {username, room});
}


//Sending username if the user has stopped typing
var typingTimer; 
function doneTyping() {	
	clearTimeout(typingTimer);
	typingTimer = setTimeout(function () {
		//do something
    	socket.emit('done-typing', { username, room });
	}, 1000);
}


function setfeedbackDisplay(show) {
	if(show == true)
		feedback.style.display = "block";
	else
		feedback.style.display = "none";
}

setfeedbackDisplay(false)
