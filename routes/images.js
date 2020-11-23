"use strict";
let express = require("express");
let router = express.Router();
let Image = require("../models/Image.js");

//Insère une image dans le json
router.post("/", function (req, res) {  
    let newImage = new Image(req.body);
    console.log("POST new Image : ", newImage);
    Image.save();
    return res.json(Image);
  });


module.exports = router;
