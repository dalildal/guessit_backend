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

const {userJoin, getCurrentUser, getUserList, userLeave ,formatMessage, /*addImage,
getImagesAlreadyDisplayed*/} = require("./models/TestUser");
const {getRandomImage} = require("./models/Image.js");


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
      
      socket.broadcast.emit('broadcast',formatMessage(user.username," a rejoint la partie"));
  
      io.emit('userList', {
        users : getUserList()
      });
    }    
  });

  io.emit('randomImage', {
    image : getRandomImage()    
  });
  
  socket.on('chat-message', (msg) => {
    console.log(msg);
    const user = getCurrentUser(socket.id);
    io.emit('message', formatMessage(user.username,msg));
  })
  
  //when user disconnect
  socket.on('disconnect', () =>{
    const user = userLeave(socket.id);
    
      if(user){
        io.emit('message', formatMessage(user.username,' a quitté la partie'));
      }

    
  });
  //On lance la partie
  socket.on('launch-game', () => {
    //On crée la liste d'images déjà affichées
    let imagesAlreadyDisplayed = new Array();
    //On récupère les users connectés à la room
    let users = getUserList();
    console.log("Lance partie");
    //Socket pour récupérer une image aléatoire
    socket.on('launch-image', () => {
      let image = getRandomImage();
      while(imagesAlreadyDisplayed.includes(image.id)){
        console.log("Image Already displayed",image.wordToFind);
        image = getRandomImage();
      }
      imagesAlreadyDisplayed.push(image.id);
      console.log(imagesAlreadyDisplayed);
      console.log(image.wordToFind);
      //On envoie l'image aléatoire
      io.emit('get-image',{image});
    });

    //Socket pour reset le timer
    socket.on('launch-timer', () => {
      io.emit('reset-timer');
    })

    //Socket pour incrementer le round actuel
    socket.on('launch-round', () => {
      io.emit('increment-round');
    })

    socket.on('launch-endGame', () => {
      io.emit('end-game',users);
    })

    socket.on('launch-goodAnswer', (userId) => {
      users.forEach(element => {
        if(element.id === userId){
          element.correctAnswers++;
        }
      });
    });

  })
});



myHttpExpressServer.listen(3000, ()  => {
  console.log('Socket server listening on *:3000');
});


module.exports = app;
