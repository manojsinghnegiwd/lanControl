// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var socket = require('socket.io');
var robot = require("robotjs");
var http = require("http");
var app = http.createServer();
var io = socket(app);

io.on('connection', function (socket) {

	(function () {
		var start = document.querySelector('#start');
		start.addEventListener('click', move);
	})();

	var previousPos = {};
	var nextPos = {};

	function move () {
		var intervalId = setInterval(function () {
			nextPos = robot.getMousePos();

			if(previousPos.x !== nextPos.x || previousPos.y !== nextPos.y) {
				socket.emit('mousemove', nextPos);
				previousPos = nextPos;
			}

		}, 1)
	}

})

io.listen(7000);