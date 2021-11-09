function routes(app) {

	//Render Index page
	app.get('/', (req, res) => {
	    res.render('home')
	});


	//Rooms
	app.get('/chat', (req, res)=>{
	    res.render('chat', { 
	    	username: req.query.username,
	    	room: req.query.room
	    });
	});	
}

module.exports = routes;
