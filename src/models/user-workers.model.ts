export interface UserServices {
	postTo(socket, body): void;
	getAll(socket, body): void;
	getByID(socket, body): void;
	dropByID(socket, body): void;
}