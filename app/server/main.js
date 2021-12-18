const {
	getActiveUser,
	exitRoom,
	joinRoom,
	getIndividualRoomUsers,
	formatMessage
} = require('./helper');


function main(io) {

	// this block will run when the client connects
	io.on('connection', socket => {
		
		// Runs when client joins a chat room
		socket.on('join-room', ({ username, room }) => {
			const user = joinRoom(socket.id, username, room);
			socket.join(user.room);

			// General welcome
			socket.emit('message', formatMessage('NodeJSChatApp', 'Welcome to the ' + room + ' chat room!'));

			// Broadcast everytime users connects
			socket.broadcast
				.to(user.room)
				.emit('message', formatMessage('NodeJSChatApp', `${user.username} has joined the room`));

			// Current active users and room name
			io.to(user.room).emit('room-users', {
				room: user.room,
				users: getIndividualRoomUsers(user.room)
			});
		});


		// Listen for client message
		socket.on('chatMessage', message => {
			const user = getActiveUser(socket.id);
			io.to(user.room).emit('message', formatMessage(user.username, message));
		});


		// Broadcasting the user who is typing
		socket.on('typing', (data) => {
			socket.broadcast.to(data.room).emit('typing', data.username)
		})


		// Broadcasting the user who has stopped typing
		socket.on('done-typing', (data) => {
			socket.broadcast.to(data.room).emit('done-typing', data.username)
		})


		// Runs when client disconnects
		socket.on('disconnect', () => {
			const user = exitRoom(socket.id);
			if(user) {
				io.to(user.room).emit(
					'message',
					formatMessage('NodeJSChatApp', `${user.username} has left the room`)
				);

				// Current active users and room name
				io.to(user.room).emit('room-users', {
					room: user.room,
					users: getIndividualRoomUsers(user.room)
				});
			}
		});
	});
}

module.exports = main;
