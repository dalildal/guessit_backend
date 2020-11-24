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
 
const io = require("socket.io")(myHttpExpressServer, {
  cors: {
    origin: "http://localhost/", // Client here is localhost:80
    methods: ["GET", "POST"]
  }
});
 
io.on('connection', socket => {
  console.log('New Socket Connection');
  socket.emit("broadcast", "New Socket Client : Welcome !");
});
myHttpExpressServer.listen(3000, ()  => {
  console.log('Socket server listening on *:3000');
});

//var http = require('http').createServer(app);
//var io = require('socket.io')(http);
// server-side
/* const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
*/

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

//const EXPRESS = require('express');
//let myExpressServerApplication = express();
let myHttpExpressServer = require('http').createServer(app);
 
const io = require("socket.io")(myHttpExpressServer, {
  cors: {
    origin: "http://localhost", // Client here is localhost:80
    methods: ["GET", "POST"]
  }
});
 
io.on('connection', socket => {
  console.log('New Socket Connection');
  socket.emit("broadcast", "New Socket Client : Welcome !");
});
 
myHttpExpressServer.listen(3000, ()  => {
  console.log('Socket server listening on *:3000');
});



module.exports = app;

