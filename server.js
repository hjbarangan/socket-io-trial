// Create a new file called `index.js`
const express = require("express");
const socketIO = require("socket.io");
const pg = require("pg");

require('dotenv').config()

// Create an Express app
const app = express();

// Create a PostgreSQL connection pool
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const httpServer = require("http").createServer(app);
const io = socketIO(httpServer);

// Listen for connections
io.on("connection", (socket) => {
    // When a new client connects, emit an event to all clients
    io.emit("new-client", socket.id);

    // Listen for messages from the client
    socket.on("message", (data) => {
        // Echo the message back to the client
        socket.emit("message", data);
    });
});

httpServer.listen(3000, () => {
    console.log(`Server started on port 3000`);
}) 
