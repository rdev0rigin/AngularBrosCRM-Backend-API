import * as http from 'http';
import * as express from 'express';
import * as Socketio from 'socket.io';
import {CRMStoreManager} from './orm/store-manager';
import {ResponseObject} from './models/response-object.model';
import {dbConfig} from './orm/config';

export class Server {
	private app: express.Application;
	private server;
	private IO;
	private crmStoreManager: CRMStoreManager;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor(){
		this.app = express();
		this.config();
		this.endPoints();
	}

	private config(): void {
		this.server = http.createServer(this.app);
		console.log('listening on port Taxi Cab');
		this.IO = Socketio(this.server);
		this.server.listen(1729);
		this.crmStoreManager = new CRMStoreManager(dbConfig);
	}

	private endPoints(): void {
		this.IO.on('connection', socket => {
			console.log('on hit 35', socket);
			socket.on('user', payload => {
			console.log('on hit get', payload);
			// this.crmStoreManager
			// 	.getUser(payload.id)
			// 	.then(response => {
			// 		socket.emit('user.get.response' , response);
			// 	})
			// });
			socket.on('user.set', payload => {
				console.log('on hit 43', payload);
			// 	this.crmStoreManager
			// 		.setUserProp(payload.id, payload.propObj)
			// 		.then(response => {
			// 			socket.emit('user.set.response', response);
			// 	})
			});
			socket.on('disconnect', ()=> {
				console.log('dc\'d');
			})
		});
	})
	}
}