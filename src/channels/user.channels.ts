// export function channels(path, socket, body){
// 	if () {
// 		return postUser(socket, body)
//
// 	} else if () {
//
// 		return getUserById(socket, body)
// 	} else if () {
//
// 	}
// }
// function postUser(socket, body): void {
// 	db.users.update(body, {
// 		where: {
// 			id: body.id
// 		}
// 	}).then(updatedUser => {
// 		socket.emit('post.user', updatedUser);
// 	}, err => console.log(err));
// }
//
// function getUsers(socket, query): void {
// 	db.users.findAll({
// 		attributes: query.attributes
// 	}).then(res => {
// 		let temp: any[] = [];
// 		for (let values of res) {
// 			temp.push(values.dataValues);
// 		}
// 		socket.emit('get.users', temp);
// 	});
// }
//
// export function getUserById(socket, body): void {
// 	db.users.findAll({
// 		where: {
// 			id: body.id
// 		}
// 	}).then(res => {
// 		socket.emit('get.userById', res[0].dataValues);
// 	})
// }
//
// export function deleteUser(socket, req) {
//
// }