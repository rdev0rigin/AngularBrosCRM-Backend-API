import * as http from 'http';
import * as express from 'express';
import * as Socketio from 'socket.io';
import {CRMStoreManager} from './orm/store-manager';
import {Endpoints} from './channel-points/channel-points';
import {EmailManager} from './emailer/email-manager';

export class Server extends Endpoints {
	public emailManager: EmailManager;
	private app: express.Application;
	private server: express.Server;
	private IO;
	private port: number = 1729;
	private crmStoreManager: CRMStoreManager;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor(){
		super();
		this.app = express();
		this.config();
		this.endPoints();
	};

	private config(): void {
		this.server = http.createServer(this.app);
		console.log('listening on port ' + this.port);
		this.server.listen(this.port);
		this.IO = Socketio(this.server);
		this.crmStoreManager = new CRMStoreManager();
		this.emailManager = new EmailManager();
	}

	private endPoints(): void {
		this.IO.on('connection', socket => {
			this.socketOnCompanies(socket, this.crmStoreManager);
			this.socketOnQuotes(socket, this.crmStoreManager);
			this.socketOnContacts(socket, this.crmStoreManager);
			this.socketOnUsers(socket, this.crmStoreManager);
			this.socketOnNotes(socket, this.crmStoreManager);
			this.socketOnEmailer(socket, this.emailManager)
		})
	}
}



