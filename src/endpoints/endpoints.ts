import {CRMStoreManager} from '../orm/store-manager';
import * as SocketIO from 'socket.io';
import {error} from 'util';
import {QuoteAttributes} from '../orm/table-models/attributes/quote.attributes';

//TODO Update To real endpoints for bi-directional sockets. ;P
export class Endpoints {
	constructor() {}

	public socketOnNotes(socket: SocketIO, crmStoreManager: CRMStoreManager): void {
		socket.on('note.create', (payload: any) => {
			console.log('NoteCreated', payload);
			if (payload){
				crmStoreManager.createNote(payload)
					.then(note => {
						socket.emit('note.create.response', note);
					});
			} else {
				socket.emit('note.create.response', {error: 'Cannot create without payload.'});
			}
		});

		socket.on('notes.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string') {
				crmStoreManager.getNote(payload)
					.then(note => {
						console.log('not with ID RESPONSE HIT: ');
						socket.emit('notes.get.response', note);
					});
			} else {
				console.log('get notes', payload);
				crmStoreManager.getNotes(payload)
					.then(notes => {
						console.log('notes get response: ', notes);
						socket.emit('notes.get.response', notes);
				});
			}
		});

		socket.on('note.set', (payload: any) => {
			crmStoreManager.setNoteProp(payload)
				.then(response => {
					socket.emit('note.set.response', response);
				});
		});

		socket.on('note.destroy', (payload: any) => {
			crmStoreManager.destroyNote(payload)
				.then(response => {
					socket.emit('note.destroy.response', response);
				});
		});
	}

	public socketOnUsers(socket: SocketIO, crmStoreManager: CRMStoreManager){
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
					console.log('user.set.response', payload);
			crmStoreManager.setUserProps(payload)
				.then(response => {
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
		socket.on('contact.create', (payload?: any) => {
			if(payload) {
				crmStoreManager.createContact(payload).then(contact => {
					socket.emit('contact.create.response', contact);
				}, err => {
					console.log('error', err)
				});
			}
		});

		socket.on('contacts.get', (payload?: any) => {
			if (payload && typeof payload.id === 'string'){
				crmStoreManager.getContact(payload)
					.then(contact => {
						socket.emit('contacts.get.response', contact);
					}, err => {
						console.log('error', err)
					});
			} else {
				crmStoreManager.getContacts(payload)
					.then(contacts => {
						socket.emit('contacts.get.response', contacts);
				}, err => {
						console.log('error', err)
					});
			}
		});

		socket.on('contact.set', (payload: any) => {
			if(payload && typeof payload.id === 'string')
				crmStoreManager.setContactProps(payload)
				.then(contact => {
					socket.emit('contact.set.response', contact);
				}, err => {
					console.log('error', err)
				});
		});

		socket.on('contact.destroy', (payload: any) => {
			crmStoreManager.deleteContact(payload).then(res => {
				socket.emit('contact.destroy.response', res);
			})
		})
	}

	public socketOnCompanies(socket: SocketIO, crmStoreManager: CRMStoreManager) {
		socket.on('companies.get', () => {
			crmStoreManager.getCompanies()
				.then((companies: any) => {
					socket.emit('companies.get.response', companies);
				}, err => {
					console.log('error', err)
				});
		});

		socket.on('company.get', (payload) => {
			crmStoreManager.getCompany(payload)
				.then((companies: any) => {
					socket.emit('company.get.response', companies);
				}, err => {
					console.log('error', err)
				});
		});

		socket.on('company.set', (payload: any) => {
			if (payload.prop && typeof payload.id === 'string') {
				crmStoreManager.setCompanyProp(payload)
				.then(company => {
					socket.emit('company.set.response', company);
				}, err => {
					console.log('error', err)
				});
			} else if(payload.props){
				crmStoreManager.setCompanyProps(payload)
					.then(company => {
						socket.emit('company.set.response', company);
				})
			} else {
				socket.emit('company.set.response', {error: 'Error: No payload or id'});
			}
		});

		socket.on('company.create', (payload?: any) => {
			crmStoreManager
				.createCompany(payload)
				.then(company => {
					socket.emit('company.create.response', company);
				});
		});

		socket.on('company.delete', (payload?: any) => {
			crmStoreManager
				.deleteCompany(payload)
				.then(company => {
					socket.emit('company.delete.response', company);
				});
		});
	}
}


