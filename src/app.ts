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
	private port: number = 1729;
	private crmStoreManager: CRMStoreManager;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		this.app = express();
		this.config();
		this.endPoints();
	}

	private config(): void {
		this.server = http.createServer(this.app);
		console.log('listening on port' + this.port);
		this.IO = Socketio(this.server);
		this.server.listen(this.port);
		this.crmStoreManager = new CRMStoreManager(dbConfig);
	}

	private endPoints(): void {
		this.IO.on('connection', socket => {
			socket.on('user.test.create', () => {
				this.crmStoreManager
					.createTestUser()
					.then(user => {
						socket.emit('user.test.create.response', user);
					})
			});

			socket.on('user.get', payload => {
				console.log('user.get', payload);
				this.crmStoreManager
					.getUser(payload.id)
					.then(user => {
						socket.emit('user.get.response' , user);
					});
			});

			socket.on('user.set', payload => {
				this.crmStoreManager
					.setUserProp(payload.id, payload.prop)
					.then(response => {
						socket.emit('user.set.response', response);
				});
			});

			socket.on('companies.get', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.getCompanies(payload.id)
					.then((companies) => {
					socket.emit('companies.get.response', companies);
				});
			});

			socket.on('companies.post', payload => {
				this.crmStoreManager.setCompaniesProp(payload.id, payload.prop).then(company => {
					console.log('payload 0', payload);
					socket.emit('companies.post.response', company);
				});
			});

			socket.on('companies.create', payload => {
				this.crmStoreManager.setCompaniesProp(payload.id, payload.prop).then(company => {
					console.log('payload 0', payload);
					socket.emit('companies.post.response', company);
				});
			});

			socket.on('contacts.create', payload => {
				this.crmStoreManager.createContacts(payload.contactProps).then(contact => {
					console.log('payload 0', payload);
					socket.emit('contacts.post.response', contact);
				});
			});

			socket.on('contacts.get', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.getContacts()
					.then(contacts=> {socket.emit('contacts.get.response', contacts);
				});
			});

			socket.on('contacts.post', payload => {
				this.crmStoreManager.setContactsProp(payload.id, payload.prop)
					.then(contacts => {socket.emit('contacts.post.response', contacts);
				});
				console.log('payload 0', payload);
			});

			socket.on('notes.get', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.getNotes(payload.id || '').then(notes => {
					socket.emit('notes.get.response', notes);
				});
			});

			socket.on('note.post', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.setNoteProp(payload.id, payload.prop).then(note => {
					socket.emit('notes.post.response', note)
				});
			});

			socket.on('note.create', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.createNotes(payload.props).then(note => {
					socket.emit('notes.post.response', note)
				});
			});

			socket.on('quote.create', payload => {
				console.log('payload 0', payload.quoteProp);
				this.crmStoreManager.createQuotes(payload.props).then(quote => {
					socket.emit('quotes.post.response', quote);
				});
			});

			socket.on('quotes.get', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.getQuotes(payload.id || '').then(quotes => {
					socket.emit('quotes.get.response', quotes);
				});
			});

			socket.on('quotes.post', payload => {
				console.log('payload 0', payload);
				this.crmStoreManager.createQuotes(payload.quoteProps).then(quotes => {
					socket.emit('quotes.post.response', quotes);
				});
			});

			socket.on('quoteLines.post', payload => {
					console.log('payload 0', payload.quoteId, payload.quoteLine);
					this.crmStoreManager.createQuotes(payload.quoteProps).then(quotes => {
						socket.emit('quoteLines.post.response', quotes);
					})
				});
			});
	}
}