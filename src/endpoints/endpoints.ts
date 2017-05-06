import {CRMStoreManager} from '../orm/store-manager';
import * as SocketIO from 'socket.io';
import {error} from 'util';
import {NoteAttributes} from '../orm/table-models/attributes/note.attributes';
import {QuoteAttributes} from '../orm/table-models/attributes/quote.attributes';

export class Endpoints {
	constructor() {}
	public socketOnNotes(socket: SocketIO, crmStoreManager) {
		socket.on('notes.create', (payload: any) => {
			if (payload){
				crmStoreManager.createNote(payload)
					.then(note => {
						socket.emit('notes.create.response', note);
					});
			} else {
				socket.emit('notes.create.response', {error: 'Cannot create without payload.'});
			}
		});

		socket.on('notes.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string') {
				crmStoreManager.getNote(payload)
					.then(note => {
						socket.emit('notes.get.response', note);
					});
			} else {
				crmStoreManager.getNotes()
					.then((notes: NoteAttributes[])=> {
						socket.emit('notes.get.response', notes);
				});
			}
		});

		socket.on('notes.set', (payload: any) => {
			crmStoreManager.setNoteProp(payload)
				.then(response => {
					socket.emit('notes.set.response', response);
				});
		})
	}

	public socketOnUsers(socket: SocketIO, crmStoreManager){
		socket.on('user.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string') {
				crmStoreManager.getUser(payload)
					.then(user => {
						socket.emit('user.get.response', user);
					}, err => {
						console.log('error', err)
					});
			} else {
				socket.emit('user.get.response', {error: 'No ID in payload'})
			}
		});

		socket.on('user.set', (payload: any) => {
			crmStoreManager
				.setUserProp(payload)
				.then(response => {
					console.log('res', response);
					socket.emit('user.set.response', response);
				}, err => {
					console.log('error', err)
				});
		})
	}

	public socketOnQuotes(socket: SocketIO , crmStoreManager: CRMStoreManager) {
		socket.on('quotes.create', (payload: any) => {
			if (payload){
				crmStoreManager.createQuote(payload)
					.then((quote: QuoteAttributes) => {
						socket.emit('quotes.create.response', quote);
					}, err => {
						console.log('error', err)
					});
			}
		});

		socket.on('quotes.get', (payload?: any) => {
			if(payload && typeof payload.id === 'string') {
				crmStoreManager.getQuote(payload)
					.then(quotes => {
						socket.emit('quotes.get.response', quotes);
					}, err => {
						console.log('error', err)
					});
			} else {
				crmStoreManager.getQuotes().then((quotes: QuoteAttributes[]) => {
					socket.emit('quotes.get.response', quotes);
				})
			}
		});

		socket.on('quotes.set', (payload: any) => {
			crmStoreManager.setQuoteProp(payload).then(quotes => {
				socket.emit('quotes.set.response', quotes);
			}, err => {
				console.log('error', err)
			})
		})
	}

	public socketOnContacts(socket: SocketIO, crmStoreManager: CRMStoreManager) {
		socket.on('contacts.create', (payload?: any) => {
			if(payload) {
				crmStoreManager.createContact(payload).then(contact => {
					socket.emit('contacts.create.response', contact);
				}, err => {
					console.log('error', err)
				});
			}
		});

		socket.on('contacts.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string'){
				crmStoreManager.getContact(payload)
					.then(contacts => {
						socket.emit('contacts.get.response', payload);
					}, err => {
						console.log('error', err)
					});
			} else {
				crmStoreManager.getContacts()
					.then(contacts => {
						socket.emit('contacts.get.response', contacts);
				}, err => {
						console.log('error', err)
					});
			}
		});

		socket.on('contacts.set', (payload: any) => {
			if(payload && typeof payload.id === 'string')
				crmStoreManager.setContactProp(payload)
				.then(contacts => {
					socket.emit('contacts.set.response', contacts);
				}, err => {
					console.log('error', err)
				});
		});
	}

	public socketOnCompanies(socket: SocketIO, crmStoreManager: CRMStoreManager) {
		socket.on('companies.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string') {
				crmStoreManager.getCompany(payload)
					.then((companies: any) => {
						socket.emit('companies.get.response', companies);
					}, err => {
						console.log('error', err)
					});
			} else {
				crmStoreManager.getCompanies()
					.then((companies: any) => {
						socket.emit('companies.get.response', companies);
					}, err => {
						console.log('error', err)
					});
			}
		});

		socket.on('companies.set', (payload: any) => {
			if (payload && typeof payload.id === 'string') {
				crmStoreManager.setCompanyProp(payload)
				.then(company => {
					socket.emit('companies.set.response', company);
				}, err => {
					console.log('error', err)
				});
			} else {
				socket.emit('companies.set.response', {error: 'Error: No payload or id'});
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


