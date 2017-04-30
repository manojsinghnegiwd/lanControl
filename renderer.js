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

function init () {
	var startClientBtn = document.querySelector('#startClient');
	var startServerBtn = document.querySelector('#startServer');

	startClientBtn.addEventListener('click', startClient);
	startServerBtn.addEventListener('click', startServer);

}

function startClient () {
	var client = socketClient('http://localhost:' + port);

	socket.on('mousemove', function (data) {
		console.log('move mouse to x: ' + mouse.x + ' y: ' + mouse.y)
	})
}

function startServer () {
	var server = socket(app);

	server.on('connection', function (client) {

		console.log('client connected')

	})

	console.log(port);

	server.listen(port, function () {
		console.log('server started')
	});
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