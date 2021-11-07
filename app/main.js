const {
	getActiveUser,
	exitRoom,
	joinUser,
	getIndividualRoomUsers,
	formatMessage
} = require('./helpers/userHelper');


function main(io) {

	// this block will run when the client connects
	io.on('connection', socket => {

		socket.on('joinRoom', ({ username, room }) => {
			const user = joinUser(socket.id, username, room);

			socket.join(user.room);

			// General welcome
			socket.emit('message', formatMessage("WebCage", 'Messages are limited to this room! '));

			// Broadcast everytime users connects
			socket.broadcast
				.to(user.room)
				.emit(
					'message',
					formatMessage("WebCage", `${user.username} has joined the room`)
				);

			// Current active users and room name
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getIndividualRoomUsers(user.room)
			});
		});





		// Listen for client message
		socket.on('chatMessage', msg => {
			const user = getActiveUser(socket.id);
			io.to(user.room).emit('message', formatMessage(user.username, msg));
		});


		//Broadcasting the user who is typing
        socket.on('typing', (data) => {
            socket.broadcast.to(data.room).emit('typing', data.username)
        })


        //Broadcasting the user who has stopped typing
        socket.on('done-typing', (data) => {
            socket.broadcast.to(data.room).emit('done-typing', data.username)
        })



		// Runs when client disconnects
		socket.on('disconnect', () => {
			const user = exitRoom(socket.id);

			if (user) {
				io.to(user.room).emit(
					'message',
					formatMessage("WebCage", `${user.username} has left the room`)
				);

				// Current active users and room name
				io.to(user.room).emit('roomUsers', {
					room: user.room,
					users: getIndividualRoomUsers(user.room)
				});
			}
		});



	})
}

module.exports = main;
