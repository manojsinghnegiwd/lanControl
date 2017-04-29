// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var io = require('socket.io');
var robot = require("robotjs");

(function () {
	var start = document.querySelector('#start');

	start.addEventListener('click', move);
})()

function move () {
	
}