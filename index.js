const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const main = require('./app/server/main');
const routes = require('./app/server/routes');
const PORT = 5000;


const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// Set public directory
app.use(express.static(path.join(__dirname, 'app/client')));

// Set templating engine as ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/client/views'));

// Initializing routes
routes(app);

// Create server
const server = http.createServer(app);
const io = socketio(server);
main(io);

// Start server
server.listen(PORT, () => console.log(`[APP] The server is running at localhost:${PORT}`));
