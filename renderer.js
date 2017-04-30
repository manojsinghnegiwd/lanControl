// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var socket = require('socket.io');
var robot = require("robotjs");
var http = require("http");
var socketClient = require('socket.io-client');
var app = http.createServer();
var port = 3000;
var selectedClient = null;
var nextPos = {};
var previousPos = {};

window.onload = init;

function init () {
	startClientBtn = document.querySelector('#startClient');
	startServerBtn = document.querySelector('#startServer');
	serverAddress = document.querySelector('#serverAddress');

	startClientBtn.addEventListener('click', startClient);
	startServerBtn.addEventListener('click', startServer);

}

function startClient (address) {
	var client = socketClient(serverAddress.value + ':' + port);

	client.on('mousemove', function (data) {
		robot.moveMouse(data.x, data.y);
		console.log('move mouse to x: ' + data.x + ' y: ' + data.y)
	})
}

function startServer () {
	var server = socket(app);

	server.on('connection', function (client) {

		console.log('client connected')

		selectedClient = client;

		var clearInterval = startTracking();

	});

	server.listen(port, function () {
		console.log('server started')
	});
}

function startTracking () {
	return setInterval(function () {
		nextPos = robot.getMousePos();

		if(previousPos.x !== nextPos.x || previousPos.y !== nextPos.y) {
			selectedClient.emit('mousemove', nextPos);
			previousPos = nextPos;
		}

	}, 1)
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