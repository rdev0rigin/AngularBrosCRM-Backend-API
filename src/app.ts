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
			socket.on('user.get', payload => {
				this.crmStoreManager
					.getUser(payload.id)
					.then(user => {
						socket.emit('user.get.response' , user);
					});
			},
			socket.emit('user.response', ['three']));
			socket.on('user.set', payload => {
				this.crmStoreManager
					.setUserProp(payload.id, payload.prop)
					.then(response => {
						socket.emit('user.set.response', response);
				})
			});
		});
	}
}