// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var socket = require('socket.io');
var robot = require("robotjs");
var http = require("http");
var socketClient = require('socket.io-client');
var app = http.createServer();
var port = 3000;

window.onload = init;

var init = function () {
	var startClientBtn = document.querySelector('#startClient');
	var startServerBtn = document.querySelector('#startServer');

	startClientBtn.addEventListener('click', startClient);
	startServerBtn.addEventListener('click', startServer);

}

var startClient = function () {
	var client = socketClient('http://localhost:' + port);

	socket.on('mousemove', function (data) {
		console.log('move mouse to x: ' + mouse.x + ' y: ' + mouse.y)
	})
}

var startServer = function () {
	var server = socket(app);

	server.on('connection', function (client) {

		console.log('client connected')

	})

	server.listen(7000);
}



// var io = socket(app);

// io.on('connection', function (socket) {

// 	(function () {
// 		var start = document.querySelector('#start');
// 		start.addEventListener('click', move);
// 	})();

// 	var previousPos = {};
// 	var nextPos = {};

// 	function move () {
// 		var intervalId = setInterval(function () {
// 			nextPos = robot.getMousePos();

// 			if(previousPos.x !== nextPos.x || previousPos.y !== nextPos.y) {
// 				socket.emit('mousemove', nextPos);
// 				previousPos = nextPos;
// 			}

// 		}, 1)
// 	}

// })

// io.listen(7000);