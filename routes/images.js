var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    console.log("Get logo image");
    res.sendFile('D:/Cours/Bloc2/Q1/JavaScript/Projet/Code/guessit_backend/public/images/guessItLogo.jpg');
});

module.exports = router;
