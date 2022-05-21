var dayjs = require('dayjs')

const users = [];

// Join user to chat room
function joinRoom(id, username, room) {
	const user = { id, username, room };
	users.push(user);
	return user;
}

// Get current user
function getActiveUser(id) {
	return users.find(user => user.id === id);
}

// User leaves chat room
function exitRoom(id) {
	const index = users.findIndex(user => user.id === id);
	if(index !== -1) 
		return users.splice(index, 1)[0];
}

// Get room users
function getIndividualRoomUsers(room) {
	return users.filter(user => user.room === room);
}

// Format the message
function formatMessage(username, text) {
	return {
		username,
		text,
		time: dayjs().format('hh:mm a')
	};
}

module.exports = {
	joinRoom,
	getActiveUser,
	exitRoom,
	getIndividualRoomUsers,
	formatMessage
};
