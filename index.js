
var path = require("path");
var express = require("express");

var server = express();

server.use(express.static(path.join(__dirname, "/site")));

server.get("/:project", function(req, res) {
	res.sendFile(path.join(__dirname, "/site/index.html"));
});


//temporary, until I start finalize & commit the graphics
server.get("/assets/grid.png", function(req, res) {
	res.sendFile(path.join(__dirname, "../portfolio/grid.png"));
});

server.get("/assets/laser.jpg", function(req, res) {
	res.sendFile(path.join(__dirname, "../portfolio/laser.jpg"));
});


console.log("Listening on 8080");
server.listen(8080);
