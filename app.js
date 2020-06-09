const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const socketIo = io(server);

// Setup socket.io
socketIo.on('connection', socket => {
    console.log(`connected`);

    socket.on('client:message', data => {
        console.log(`${data}: ${data}`);

        // message received from client, now broadcast it to everyone else
        socket.broadcast.emit('server:message', data);
    });

    socket.on('disconnect', () => {
        console.log(`disconnected`);
    });
});

// Start listening
server.listen(4010);
console.log("server listening in port 4008")