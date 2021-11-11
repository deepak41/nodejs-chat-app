// Joining user to chat room
function joinRoom(form) {
	if(form.username.value && form.room.value) {
		var url = `/chat?username=${form.username.value}&room=${form.room.value}`;
		window.location.replace(url);
	}
}
