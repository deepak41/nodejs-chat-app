// Joining user to chat room
function joinRoom(form) {
	if(form.username.value && form.room.value) {
		localStorage.setItem('username', form.username.value);
		localStorage.setItem('room', form.room.value);
		window.location.replace('/chat');
	}
}
