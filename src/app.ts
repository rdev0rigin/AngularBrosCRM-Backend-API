import * as http from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
var app = express();
var server = http.createServer(app);
var io = socketio(server);
var db = require('./database/db');
var user = require('./workers/user.workers');
db.sequelize.sync().then(() => {
	// db.users.create({
	// 	name: '(R)Development Webware'
	// })
});

// collects open socket connections
let sockets = [];
io.on('connection', socket => {
	sockets.push(socket);

	socket.on('post.user', body => {
		user.postTo(socket, body);
	});

	socket.on('get.users', body => {
		console.log('hit getUsers', body);
		user.getAll(socket, body);
	});

	socket.on('get.userById', body => {
		user.getByID(socket, body);
	});

	socket.on('delete.user', request => {

	});

	socket.on('disconnect', () => {

		// removes closed socket connections
		sockets = sockets.filter(s => s !== socket);
	});
});

export default server;
