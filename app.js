var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var gamesRouter = require("./routes/games");
var imagesRouter = require("./routes/images");



let app = express();
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


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
