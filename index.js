
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const server = http.createServer(app);
const io = socketio(server);
require('./app/main')(io);

//Render Index page
app.get('/', (req, res) => {
    res.render('home')
})

//Rooms
app.get('/chat', (req, res)=>{
    res.render('chat')
})


const PORT = process.env.PORT || 3003;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));