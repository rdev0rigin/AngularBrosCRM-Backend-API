import {UserServices} from '../models/user-workers.model';
var db = require('../database/db');
var user: UserServices = <UserServices>{};
user.postTo = function postUser(socket, body): void {
	db.users.update(body.attributes, {where: {id: body.id}})
		.then(updatedUser => {
		console.log('updatedUser', updatedUser);
		socket.emit('post.user', updatedUser);
	}, err => console.log(err));
};

user.getAll = function getUsers(socket, body): void {
	db.users.findAll({
		attributes: body.attributes
	}).then(res => {
		let temp: any[] = [];
		for (let values of res) {
			temp.push(values.dataValues);
		}
		socket.emit('get.users', temp);
	});
};

user.getByID = function getUserById(socket, body): void {
	db.users.findAll({
		where: {
			id: body.id
		}
	}).then(res => {
		socket.emit('get.userById', res[0].dataValues);
	})
};

// To Delete or NOT to Delete
user.dropByID = function deleteUser(socket, req) {

};

module.exports = user;