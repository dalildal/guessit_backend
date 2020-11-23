"use strict";
let express = require("express");
let router = express.Router();
let Game = require("../models/Game.js");

//Crée une nouvelle game
router.post("/", function (req, res) {  
    let newGame = new Game(req.body);
    console.log("POST new Game : ", newGame);
    newGame.save();
    return res.json(newGame);
  });

router.get("/",  function (req, res) { 
  console.log("GET maxId : ",Game.maxId);
  return res.json(Game.maxId);
});

module.exports = router;
