var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var gamesRouter = require("./routes/games");
var imagesRouter = require("./routes/images");


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/games", gamesRouter);
app.use("/api/images", imagesRouter);

const {userJoin, getCurrentUser, getUserList, userLeave ,formatMessage} = require("./models/TestUser");


let myHttpExpressServer = require('http').createServer(app);


const io = require("socket.io")(myHttpExpressServer, {
  cors: {
    origin: "http://localhost", // Client here is localhost:80
    methods: ["GET", "POST"]
  }
});

//Quand user se connecte à la page
io.on('connection', socket => {
  console.log('New Socket Connection');
  
  //Quand user se connecte à la room  
  socket.on('joinRoom', ({pseudo}) => {
    let user;
    if(pseudo != null){
      user = userJoin(socket.id,pseudo);
      
      socket.broadcast.emit('broadcast',formatMessage(user.username," join the room"));
  
      io.emit('userList', {
        users : getUserList()
      })
    }
    
  })
  
  socket.on('chat-message', (msg) => {
    console.log(msg);
    const user = getCurrentUser(socket.id);
    io.emit('message', formatMessage(user.username,msg));
  })
  
  //when user disconnect
  socket.on('disconnect', () =>{
    const user = userLeave(socket.id);
    
      if(user){
        io.emit('message', formatMessage(user.username,'a user left the chat'));
      }

    
  });
  
  socket.on('show-user', (usr) => {
    console.log(usr.name);
  })
});

//show user


myHttpExpressServer.listen(3000, ()  => {
  console.log('Socket server listening on *:3000');
});


module.exports = app;
