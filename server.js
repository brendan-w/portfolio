
var path = require("path");
var express = require("express");

var server = express();

server.use(express.static(path.join(__dirname, "/site")));

server.get("/:project", function(req, res) {
	res.sendFile(path.join(__dirname, "/site/index.html"));
});


console.log("Listening on 8080");
server.listen(8080);
