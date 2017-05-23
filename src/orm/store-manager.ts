import * as sequelizeStatic from 'sequelize';
import {DBConfig, DB_CONFIG} from './config';
import {UserAttributes, UserInstance, UserModel} from './table-models/attributes/user.attributes';
import {CompanyAttributes, CompanyInstance, CompanyModel} from './table-models/attributes/company.attributes';
import {ContactAttributes, ContactInstance, ContactModel} from './table-models/attributes/contact.attributes';
import {NoteAttributes, NoteInstance, NoteModel} from './table-models/attributes/note.attributes';
import {QuoteAttributes, QuoteInstance, QuoteModel} from './table-models/attributes/quote.attributes';
import {QuoteLineModel} from './table-models/attributes/quote-line.attributes';
import {companyModel} from './table-models/company.table-model';
import {userModel} from './table-models/user.table-model';
import {contactModel} from './table-models/contact.table-model';
import {quoteLineModel} from './table-models/quote-line.table-model';
import {quoteModel} from './table-models/quote.table-model';
import {noteModel} from './table-models/note.table-model';

export interface StoreManager {
	getUser(payload): Promise<UserAttributes>;
	createTestUser(): Promise<UserAttributes>;
	getCompany(payload: any): Promise<CompanyAttributes[]>;
	setCompanyProp(payload: any): Promise<CompanyAttributes>;
	createCompany(payload: any): Promise<CompanyAttributes>;
	getContact(payload: any): Promise<ContactAttributes>;
	getContacts(): Promise<ContactAttributes[]>;
	setContactProp(payload: any): Promise<ContactAttributes>;
	createContact(payload: any): Promise<ContactAttributes>;
	getNote(payload: any): Promise<NoteAttributes>
	getNotes(): Promise<NoteAttributes[]>;
	setNoteProp(payload: any): Promise<NoteAttributes>;
	createNote(payload: any): Promise<NoteAttributes>;
	getQuotes(): Promise<QuoteAttributes[]>;
	getQuote(payload: any): Promise<QuoteAttributes>;
	setQuoteProp(payload): Promise<QuoteAttributes>;
	createQuote(payload: any): Promise<QuoteAttributes>;
	createQuoteLine(quoteId, quoteLine): Promise<any>;
}

export class CRMStoreManager implements StoreManager{
	public sequelize: sequelizeStatic.Sequelize;
	public User: UserModel;
	public Company: CompanyModel;
	public Contact: ContactModel;
	public Note: NoteModel;
	public Quote: QuoteModel;
	public QuoteLine: QuoteLineModel;
	private _dbConfig: DBConfig = DB_CONFIG;

	constructor() {
		this.dbConfig(this._dbConfig);
		this.modelsInit();
	}

	private modelsInit(): void {
		this.User = userModel(sequelizeStatic, this.sequelize);
		this.Company = companyModel(sequelizeStatic, this.sequelize);
		this.Contact = contactModel(sequelizeStatic, this.sequelize);
		this.Note = noteModel(sequelizeStatic, this.sequelize);
		this.Quote = quoteModel(sequelizeStatic, this.sequelize);
		this.QuoteLine = quoteLineModel(sequelizeStatic, this.sequelize);
		this.User.hasMany(this.Company);
		this.Contact.belongsTo(this.Company);
		this.Contact.hasMany(this.Note);
		this.Company.belongsTo(this.User);
		this.Company.hasMany(this.Contact);
		this.Company.hasMany(this.Quote);
		this.Quote.belongsTo(this.Company);
		this.Quote.hasMany(this.QuoteLine);
		this.QuoteLine.belongsTo(this.Quote);
	}

	private dbConfig(config): void {
		this.sequelize = new sequelizeStatic(config.database, config.username, config.password, {
			host: config.host,
			dialect: config.dialect,
			pool: {
				max: config.pool.max,
				min: config.pool.min,
				idle: config.pool.idle
			},
			storage: config.storage
		});
	}

	private syncTable(): void {
		this.sequelize.sync().then(() => {
			this.User.create({
				firstName: 'Test',
				lastName: 'Tester',
				email: 'test@tester.com',
				role: 'admin'
				})
		})
	}

	public getUser(payload): Promise<UserAttributes> {
		return new Promise((resolve, reject) => {
			this.User.findById(payload.id)
				.then((userInstance: UserInstance) => {
				console.log('user ', userInstance);
					resolve(userInstance);
					reject('error with find ID');
				});
		});
	}

	public setUserProp(payload): Promise<UserAttributes> {
		return new Promise((resolve, reject) => {
			this.User.findById(payload.id).then(userInstance => {
				userInstance.update({[payload.prop.key]: payload.prop.value})
					.then(response => {
						console.log('user set', response);
						if(+response[0] === 1) {
							this.User.findById(payload.id)
								.then((userInstance: UserInstance) => {
								resolve(userInstance);
							}, error => reject('user set prop error: ' + error))
						}
					}, error => {
						reject('update error with' + error);
				}).catch(error => console.log(error));
			})
		})
	}

	public createTestUser(): Promise<UserAttributes> {
		return new Promise((resolve, reject) => {
			this.sequelize.sync().then(instance => {
			return instance.User.create({
					email: 'test@tester.com',
					role: 'general'
			})
			}).then(userInstance =>{
				resolve(userInstance);
				reject('error with test user');
			})
		})
	}

	public getCompany(payload: any): Promise<CompanyAttributes[]> {
		if (payload) {
			return new Promise((resolve, reject) => {
				this.Company.findById(payload.id)
					.then((companiesInstance: CompanyInstance) => {
						resolve(companiesInstance);
						reject('error with find ID');
					});
			});
		}
	}

	public getCompanies(): Promise<CompanyAttributes> {
		return new Promise((resolve, reject) => {
			this.Company.findAll({
				include: [this.Contact, this.Quote]
			})
				.then((companies => {
					resolve(companies);
					reject('error: no companies found');
				}));
		});
	}

	public setCompanyProp(payload): Promise<CompanyAttributes> {
		return new Promise((resolve, reject) => {
			this.Company.findById(payload.id)
				.then((companyInstance: CompanyInstance) => {
						companyInstance.update({[payload.key]: payload.value}).then((updatedCompanyInstance: CompanyInstance) => {
							resolve(updatedCompanyInstance);
					}).catch(err => console.log('ERROR : setCompanyProp', err))
				}, error => reject('Company set prop error :' + error))
		})
	}

	public createCompany(payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.create(payload, {
				include: [this.Quote, this.Contact]
			}).then((companyInstance: CompanyInstance) => {
				resolve(companyInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}


	public getContact(payload: any): Promise<ContactAttributes> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(payload.id)
				.then((contactsInstance: ContactInstance) => {
				resolve(contactsInstance);
				reject('error with find ID');
			});
		});
	}

	public getContacts(): Promise<ContactAttributes[]> {
		return new Promise((resolve, reject) => {
			this.Contact.findAll({
				include: [this.Note]
			}).then((contactInstances: ContactInstance[]) => {
				resolve(contactInstances);
			}, error => reject('error finding Contacts: ' + error));
		});
	}

	public setContactProp(payload): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(payload.id)
				.then((contactInstance: ContactInstance) => {
					contactInstance.update({
						[payload.prop.key]:payload.prop.value
					}).then()
				}, error => {
					reject('update error with: ' + error);
				});
		})
	}

	public createContact(payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.findById(payload.owner_id).then((instance: any) => {
			instance.models.Contact.create(payload.props).then((contactInstance: ContactInstance) => {
				resolve(contactInstance);
				}, error => {
						reject('update error with' + error);
					});
				})
			})
	}

	public getNote(payload): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findById(payload.id).then((notes: NoteInstance)=> {
				resolve(notes);
				reject('error: no notes found');
			});
		});
	}

	public getNotes(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findAll()
				.then((notes: NoteInstance[])=> {
					resolve(notes);
					reject('error: no notes found');
				});
		});
	}

	public setNoteProp(payload): Promise<NoteAttributes> {
		const KEY = Object.keys(payload.prop)[0];
				console.log('SET', KEY);
		return new Promise((resolve, reject) => {
			this.Note.update(payload.prop, {
				where: {
					id: payload.id
			}
			}).then((response: any) => {
				this.Note.findById(payload.id)
					.then((noteInstance: NoteInstance) => {
					console.log('RESPONSE SET NOTE',response);
					resolve(noteInstance);
				})
			}, error => reject('update error with' + error))
		}).catch(error => console.log('error on set', error))
	}

	public createNote(payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(payload.owner_id).then((instance: any) => {
				instance.models.Note.create(payload.props).then((noteInstance: NoteInstance) => {
					resolve(noteInstance);
				}, error => {
					reject('update error with' + error);
				});
			})
		})
	}

	public getQuote(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.findById(payload.id,{
				include:
					[this.QuoteLine]
			}).then((quotesInstance: QuoteInstance) => {
				resolve(quotesInstance);
			}, error => reject('error with find ID'));
		});
	}
	public getQuotes(): Promise<QuoteAttributes[]> {
			return new Promise((resolve, reject) => {
				this.Quote.findAll({
					include:
						[this.QuoteLine]
				}).then((quotesInstance: QuoteInstance[]) => {
					resolve(quotesInstance);
				}, error => reject('error with find ID'));
			});
		}

	public setQuoteProp(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.update(payload.prop, {
				where:
					{id: payload.id}
			}).then((response: any) => {
				if(+response[0] === 1)
				this.Quote.findById(payload.id, {
					include: [this.QuoteLine]
				})
					.then((quoteInstance_find:QuoteInstance) => {
						resolve(quoteInstance_find)
					})
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createQuote(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Company.findById(payload.owner_id).then((instance: any) => {
				instance.models.Quote.create(payload.props).then((quoteInstance: QuoteInstance) => {
					resolve(quoteInstance);
				}, error => {
					reject('update error with' + error);
				});
			})
		})
	}

	public createQuoteLine(quoteId, quoteLine): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Quote.findById(quoteId)
				.then((quoteInstance: any) => {
				quoteInstance.QuoteLine.create(quoteLine).then(quoteLineInstance => {
					resolve(quoteLineInstance);
				})
			}, error => {
				reject('update error with' + error);
			});
		})
	}
}
