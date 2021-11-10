function routes(app) {

	// Render Home page
	app.get('/', (req, res) => {
	    res.render('home')
	});


	// Render Chat page
	app.get('/chat', (req, res) => {
	    res.render('chat', { 
	    	username: req.query.username,
	    	room: req.query.room
	    });
	});	
}

module.exports = routes;
