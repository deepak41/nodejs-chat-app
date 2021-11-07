function joinRoom(form) {
	if(form.email.value && form.username.value && form.room.value) {
		var url = `/chat?email=${form.email.value}&username=${form.username.value}&room=${form.room.value}`;
		window.location.replace(url);
	}
}
