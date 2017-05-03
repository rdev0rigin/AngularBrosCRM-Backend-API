import {CRMStoreManager} from '../orm/store-manager';
import * as SocketIO from 'socket.io';
export class Endpoints {

	constructor() {
	}

	public socketOnNotes(socket: SocketIO, crmStoreManager) {
		socket.on('note.create', (payload?: any) => {
			console.log('note.get', payload);
			if (payload.hasOwnProperty('id')) {
				let id = payload.id;
				crmStoreManager
					.getnote(id)
					.then(note => {
						socket.emit('note.get.response', note);
					});
			} else {
				socket.emit('note.get.response', {error: 'No ID in payload'})
			}
		});

		socket.on('note.get', (payload?: any) => {
			console.log('note.get', payload);
			if (payload.hasOwnProperty('id')) {
				let id = payload.id;
				crmStoreManager
					.getNote(id)
					.then(note => {
						socket.emit('note.get.response', note);
					});
			} else {
				socket.emit('note.get.response', {error: 'No ID in payload'})
			}
		});

		socket.on('note.set', (payload?: any) => {
			crmStoreManager
				.setNoteProp(payload.id, payload.prop)
				.then(response => {
					socket.emit('note.set.response', response);
				});
		})
	}

	public socketOnUsers(socket: SocketIO, crmStoreManager){
		socket.on('user.get', (payload?: any) => {
			console.log('user.get', payload);
			if (payload.hasOwnProperty('id')) {
				let id = payload.id;
				crmStoreManager
					.getUser(id)
					.then(user => {
						socket.emit('user.get.response', user);
					});
			} else {
				socket.emit('user.get.response', {error: 'No ID in payload'})
			}
		});

		socket.on('user.get', (payload?: any) => {
			console.log('user.get', payload);
			if (payload.hasOwnProperty('id')) {
				let id = payload.id;
				crmStoreManager
					.getUser(id)
					.then(user => {
						socket.emit('user.get.response', user);
					});
			} else {
				socket.emit('user.get.response', {error: 'No ID in payload'})
			}
		});

		socket.on('user.set', (payload?: any) => {
			crmStoreManager
				.setUserProp(payload.id, payload.prop)
				.then(response => {
					socket.emit('user.set.response', response);
				});
		})

	}

	public socketOnQuotes(socket: SocketIO , crmStoreManager: CRMStoreManager) {
		socket.on('quote.create', (payload?: any) => {
			console.log('payload 0', payload.quoteProp);
			crmStoreManager.createQuotes(payload.props).then(quote => {
				socket.emit('quotes.post.response', quote);
			});
		});

		socket.on('quotes.get', (payload?: any) => {
				console.log('payload 0quotes get', payload);
				crmStoreManager.getQuotes(payload).then(quotes => {
					console.log('hit response 96');
					socket.emit('quotes.get.response', quotes);
				});
		});

		socket.on('quotes.post', (payload?: any) => {
			if (payload) {
				console.log('payload 0', payload);
				crmStoreManager.createQuotes(payload).then(quotes => {
					socket.emit('quotes.post.response', quotes);
				});
			} else {
				crmStoreManager.createQuotes(payload.quoteProps).then(quotes => {
					socket.emit('quotes.post.response', quotes);
				});
			}

			socket.on('quoteLines.post', (payload?: any) => {
				crmStoreManager.createQuotes(payload).then(quotes => {
					socket.emit('quoteLines.post.response', quotes);
				})
			})
		})
	}

	public socketOnContacts(socket: SocketIO, crmStoreManager: CRMStoreManager) {
		socket.on('contacts.create', (payload?: any) => {
			crmStoreManager.createContacts(payload).then(contact => {
				socket.emit('contacts.create.response', contact);
			});
		});

		socket.on('contacts.get', (payload?: any) => {
			if (payload){
				crmStoreManager.getContacts(payload.id)
					.then(contacts => {
						socket.emit('contacts.get.response', payload);
					});
			} else {
				crmStoreManager.getContacts()
					.then(contacts => {
						socket.emit('contacts.get.response', payload);
					});
			}
		});

		socket.on('contacts.post', (payload: any) => {
			crmStoreManager.setContactsProp(payload.id, payload.prop)
				.then(contacts => {
					console.log('payload 0', payload);
					socket.emit('contacts.post.response', contacts);
				});
		});

	}

	public socketOnCompanies(socket: SocketIO, crmStoreManager: CRMStoreManager) {
		socket.on('companies.get', (payload?: any) => {
			console.log('COMPANIES',payload);
			if (payload) {
				crmStoreManager.getCompanies(payload.id)
					.then((companies: any) => {
						socket.emit('companies.get.response', companies);
					}, err => {
						console.log('error', err)
					});
			} else {
				crmStoreManager
					.getCompanies()
					.then((companies: any) => {
						socket.emit('companies.get.response', companies);
					}, err => {
						console.log('error', err)
					});
			}

		});

		socket.on('companies.post', (payload?: any) => {
			if (payload) {
				crmStoreManager
					.setCompaniesProp(payload.id, payload.prop)
					.then(company => {
						socket.emit('companies.post.response', company);
					});
			} else {
				crmStoreManager
					.setCompaniesProp(payload.id, payload.prop)
					.then(company => {
						socket.emit('companies.post.response', company);
					});
			}
		});


		socket.on('companies.create', (payload?: any) => {
			crmStoreManager
				.createCompany(payload)
				.then(company => {
					socket.emit('companies.create.response', company);
				});
		});
	}
}


