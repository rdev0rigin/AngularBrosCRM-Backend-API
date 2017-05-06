import {ContactInstance, ContactModel} from '../orm/table-models/attributes/contact.attributes';
import {NoteModel} from '../orm/table-models/attributes/note.attributes';
import {CRMStoreManager} from '../orm/store-manager';
import {DB_CONFIG} from '../orm/config';

export class ContactQuery {
	public Contact;
	public Note;
	constructor(){
	}

	public getContact(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(id).then((contactsInstance: any) => {
				resolve(contactsInstance.dataValues);
				reject('error with find ID');
			});
		});
	}

	public getContacts(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findAll({include: [this.Note]}).then((contactInstances: ContactInstance[]) => {
				resolve(contactInstances);
			}, error => reject('error finding Contacts: ' + error));
		});
	}

	public setContactsProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(id).then((contactInstance: ContactInstance) => {
				console.log('found contact', contactInstance);
				contactInstance.update({
					[prop.key]:prop.value
				}).then()
			}, error => {
				reject('update error with: ' + error);
			});
		})
	}

	public createContacts(contact: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.create(contact)
				.then((contactInstance: any) => {
					resolve(contactInstance);
				}, error => {
					reject('update error with' + error);
				});
		})
	}

}