"use strict";
let express = require("express");
let router = express.Router();
let Image = require("../models/Image.js");

//Insère une image dans le json
router.post("/", function (req, res) {  
    let newImage = new Image(req.body);
    console.log("POST new Image : ", newImage);
    newImage.save();
    return res.json(newImage);
});

router.get("/",  function (req, res) { 
    console.log("GET Image : ",Image.randomImage.id);
    return res.json(Image.randomImage);
});

module.exports = router;
