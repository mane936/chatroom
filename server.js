const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static files
app.use(express.static(path.join(__dirname, 'public')));

const botName = "Bot"

// run when client connects
io.on('connection', socket => {
  console.log('New WS Connection...'); // runs on server console

  // Welcome current user
  socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));

  // Broadcasts when a user connects
  socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    console.log(msg);
    io.emit('message', formatMessage('USER', msg));
  })
});


// settings
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('server listening on port', PORT));