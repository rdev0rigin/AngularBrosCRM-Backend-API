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
import * as _ from 'lodash';

export interface StoreManager {
	deleteCompany(payload): Promise<string>;
	getUser(payload): Promise<UserAttributes>;
	setUserProps(payload): Promise<UserAttributes>;
	createTestUser(): Promise<UserAttributes>;
	getCompany(payload: any): Promise<CompanyAttributes[]>;
	setCompanyProp(payload: any): Promise<CompanyAttributes>;
	setCompanyProps(payload): Promise<CompanyAttributes>;
	createCompany(payload: any): Promise<CompanyAttributes>;
	getContact(payload: any): Promise<ContactAttributes>;
	getContacts(payload: any): Promise<ContactAttributes[]>;
	setContactProps(payload: any): Promise<ContactAttributes>;
	createContact(payload: any): Promise<ContactAttributes>;
	deleteContact(payload: any): Promise<any>;
	getNote(payload: any): Promise<NoteAttributes>
	getNotes(payload): Promise<NoteAttributes[]>;
	setNoteProp(payload: any): Promise<NoteAttributes>;
	createNote(payload: any): Promise<NoteAttributes>;
	destroyNote(payload): Promise<any>;
	getQuotes(payload: any): Promise<QuoteAttributes[]>;
	getQuote(payload: any): Promise<QuoteAttributes>;
	setQuoteProps(payload): Promise<QuoteAttributes>;
	createQuote(payload: any): Promise<QuoteAttributes>;
	createQuoteLine(quoteId, quoteLine): Promise<any>;
	setQuoteLineProps(payload: any): Promise<QuoteAttributes>;
	destroyQuoteLine (payload): Promise<any>;
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
		this.Contact.belongsTo(this.Company, {foreignKey: {allowNull: false}});
		this.Contact.hasMany(this.Note);
		this.Note.belongsTo(this.Contact, {foreignKey: {allowNull: false}});
		this.Company.belongsTo(this.User);
		this.Company.hasMany(this.Contact,{foreignKey: {allowNull: false}});
		this.Company.hasMany(this.Quote);
		this.Quote.belongsTo(this.Company);
		this.Quote.hasMany(this.QuoteLine);
		this.QuoteLine.belongsTo(this.Quote);
		// this.syncTable();
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

	public setUserProps(payload): Promise<UserAttributes> {
		return new Promise((resolve, reject) => {
			this.User.findById(payload.id)
				.then(userInstance => {
					userInstance.update(payload.props)
						.then(response => {
							resolve(response);
							console.log('user set', response);
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
				include: [this.Contact, this.Quote, ]
			})
				.then((companies: CompanyInstance[])=> {
					resolve(companies);
					reject('error: no companies found');
				});
		});
	}

	public setCompanyProp(payload): Promise<CompanyAttributes> {
		return new Promise((resolve, reject) => {
			this.Company.findById(payload.id)
				.then((companyInstance: CompanyInstance) => {
						companyInstance.update({[payload.prop.key]: payload.prop.value})
							.then((updatedCompanyInstance: CompanyInstance) => {
								resolve(updatedCompanyInstance);
						}).catch(err => console.log('ERROR : setCompanyProp', err))
			}, error => reject('Company set prop error :' + error))
		})
	}

	public setCompanyProps(payload): Promise<CompanyAttributes> {
		return new Promise((resolve, reject) => {
			this.Company.findById(payload.id)
				.then((companyInstance: CompanyInstance) => {
						companyInstance.update(payload.props)
							.then((updatedCompanyInstance: CompanyInstance) => {
								resolve(updatedCompanyInstance);
						}).catch(err => console.log('ERROR : setCompanyProp', err))
			}, error => reject('Company set prop error :' + error))
		})
	}

	public createCompany(payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.create(payload.props, {
				include: [this.Quote, this.Contact]
			}).then((companyInstance: CompanyInstance) => {
				resolve(companyInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public deleteCompany(payload: any): Promise<any> {
		console.log('payload', payload);
		return new Promise((resolve, reject) => {
			this.Company.destroy({where: {id: payload.id}}).then(res => {
				resolve(res);
			}, error => {
				reject('update error with' + error);
			});
		})
	}


	public deleteContact(payload: any): Promise<any> {
		return new Promise((resolve) => {
			this.Contact.destroy({where: {id: payload.id}}).then(res => {
				resolve(res);
			})
		})
	}

	public getContact(payload: any): Promise<ContactAttributes> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(payload.id, {include: [this.Note]})
				.then((contactsInstance: ContactInstance) => {
				console.log('Contact instance ',contactsInstance);
				resolve(contactsInstance);
				reject('error with find ID');
			});
		});
	}

	public getContacts(payload): Promise<ContactAttributes[]> {
		return new Promise((resolve, reject) => {
			if(payload.owner_id){
				this.Contact.findAll({where: {company_id: payload.owner_id}, include: [this.Note]})
					.then((contactsInstance: ContactInstance[]) => {
						console.log('CONTACTS INSTANCE', contactsInstance);
						resolve(contactsInstance);
					})
			} else {
				this.Contact.findAll({include: [this.Note]})
					.then((contactsInstance: ContactInstance[]) => {
					console.log('CONTACTS INSTANCE', contactsInstance);
					resolve(contactsInstance);
				}, error => reject('error finding Contacts: ' + error));
			}
		});
	}

	public setContactProps(payload): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(payload.id)
				.then((contactInstance: ContactInstance) => {
					contactInstance.update(payload.props)
						.then((instance: ContactInstance) => {
							resolve(instance);
					})
			}, error => {
				reject('update error with: ' + error);
			});
		})
	}

	public createContact(payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const props = Object.assign({}, payload.props, {company_id: payload.owner_id});
			this.Contact.create(props).then((instance: any) => {
				resolve(instance);
			}, error => {
					reject('update error with' + error);
				});
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

	public getNotes(payload): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findAll({where: {contact_id: payload.owner_id}})
				.then((notes: NoteInstance[])=> {
					resolve(notes);
					reject('error: no notes found');
				});
		});
	}

	public setNoteProp(payload): Promise<NoteAttributes> {
		console.log('notes payload',payload);
		return new Promise((resolve) => {
				this.Note.findById(payload.id).then(noteInstance => {
					noteInstance.update({[payload.prop.key]: payload.prop.value})
						.then(response => {
							console.log('updated note with resposne: ', response);
							resolve(response);
						});
				})
			})
	}

	public createNote(payload: any): Promise<any> {
		const props = Object.assign({}, {contact_id: payload.owner_id});
		return new Promise((resolve, reject) => {
			this.Note.create(props).then((instance: any) => {
					resolve(instance);
				}, error => {
					reject('update error with' + error);
				});
		})
	}

	public destroyNote(payload): Promise<any> {
		return new Promise((resolve) => {
			this.Note.destroy({where: {id: payload.id}}).then(res => {
				resolve(res);
			})
		})
	}
	public getQuote(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.findById(payload.id,{
				include: [
					this.QuoteLine
				]
			}).then((quotesInstance: QuoteInstance) => {
				resolve(quotesInstance);
			}, error => reject('error with find ID'));
		});
	}
	public getQuotes(payload): Promise<QuoteAttributes[]> {
		if(payload.owner_id){
			return new Promise((resolve, reject) => {
				this.Quote.findAll({
					include: [
						this.QuoteLine
					],
					where: {
						company_id: payload.owner_id
					}
				}).then((quotesInstance: QuoteInstance[]) => {
					resolve(quotesInstance);
				}, error => reject('error with find ID'));
			});
		} else {
			return new Promise((resolve, reject) => {
				this.Quote.findAll({
					include:
						[this.QuoteLine]
				}).then((quotesInstance: QuoteInstance[]) => {
					resolve(quotesInstance);
				}, error => reject('error with find ID'));
			});
		}
	}

	public setQuoteProps(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.update(payload.props, {
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

	public setQuoteLineProps(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.QuoteLine.update(payload.props, {where: {id: payload.id}})
				.then((response: any) => {
					resolve(response)
				})
		});
	}

	public createQuote(payload: any): Promise<QuoteAttributes> {
		const props = Object.assign({}, payload.props, {company_id: payload.owner_id});
		return new Promise((resolve, reject) => {
			this.Quote.create(props).then((instance: any) => {
					resolve(instance);
				}, error => {
					reject('update error with' + error);
				});
			})
	}

	public createQuoteLine(payload): Promise<any> {
		const props = _.merge({}, payload.props, {quote_id: payload.owner_id});
		return new Promise((resolve) => {
			this.QuoteLine.create(props).then(res => {
				resolve(res);
			});
		})
	}

	public destroyQuote(payload): Promise<any> {
		return new Promise((resolve) => {
			this.Quote.destroy({where: {id: payload.id}}).then(res => {
				resolve(res);
			})
		})
	}

	public destroyQuoteLine (payload): Promise<any> {
		return new Promise((resolve) => {
			this.QuoteLine.destroy({where: {id: payload.id}}).then(res => {
				resolve(res);
			})
		})
	}
}
