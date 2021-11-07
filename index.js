const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const main = require('./app/server/main');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// Set public directory
app.use(express.static(path.join(__dirname, 'app/client')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/client/templates'));

const server = http.createServer(app);
const io = socketio(server);
main(io);

//Render Index page
app.get('/', (req, res) => {
    res.render('home')
})

//Rooms
app.get('/chat', (req, res)=>{
    res.render('chat')
})

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => console.log(`The server is running at localhost:${PORT}`));
