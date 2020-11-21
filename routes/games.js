"use strict";
let express = require("express");
let router = express.Router();
let Game = require("../models/Game.js");

router.post("/", function (req, res) {  
    let newGame = new Game(req.body);
    console.log("POST new Game : ", newGame);
    newGame.save();
    return res.json(newGame);
  });

module.exports = router;
