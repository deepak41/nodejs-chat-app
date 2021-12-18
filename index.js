const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
const bodyParser = require('body-parser');
const main = require('./app/server/main');
const routes = require('./app/server/routes');
const PORT = 5000;


const app = express();

// Set public directory
app.use(express.static(path.join(__dirname, 'app/client')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/client/views'));

// Initializing routes
routes(app);

// Create server
const server = http.createServer(app);
const io = socket_io(server);
main(io);

// Start server
server.listen(PORT, () => console.log(`[APP] The server is running at localhost:${PORT}`));
