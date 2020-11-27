var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var gamesRouter = require("./routes/games");
var imagesRouter = require("./routes/images");

var app = express();

// Socket.io
//const EXPRESS = require('express');
//let myExpressServerApplication = EXPRESS();
let myHttpExpressServer = require('http').createServer(app);

//let players = {}; // array of differents player

const io = require("socket.io")(myHttpExpressServer, {
  cors: {
    origin: "http://localhost", // Client here is localhost:80
    methods: ["GET", "POST"]
  }
});
 
io.on('connection', socket => {
  console.log('New Socket Connection');

  console.log('New client Connection with id '+socket.id);
  //let data = socket.id;
  //players[socket.id] = data;
  //console.log("Number of players: "+Object.keys(players).length);
  //console.log("Players dictionary : " + players);

  socket.emit("broadcast", "New Socket Client : Welcome !");

  socket.on("joinRoom", (room) =>{
    socket.join(room);
  });
  
  // msg for disconnection
  socket.on('disconnect', () => { 
    console.log("Ciao client : " + socket.id);
    // console.log("Number of players: "+Object.keys(players).length);
});

});
myHttpExpressServer.listen(3000, ()  => {
  console.log('Socket server listening on *:3000');
});

//var http = require('http').createServer(app);
//var io = require('socket.io')(http);
// server-side
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/*io.on('connection', (socket) => {
    console.log('a user connected');
});
*/

app.use("/api/games", gamesRouter);
app.use("/api/images", imagesRouter);


module.exports = app;

