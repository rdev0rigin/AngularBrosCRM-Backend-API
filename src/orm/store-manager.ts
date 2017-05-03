import * as sequelizeStatic from 'sequelize';
import {DBConfig} from './config';
import {userModel} from './table-models/user.table-model';
import {UserAttributes, UserModel} from './table-models/attributes/user.attributes';
import {companyModel} from './table-models/company.table-model';
import {CompanyAttributes, CompanyModel} from './table-models/attributes/company.attributes';
import {ContactModel} from './table-models/attributes/contact.attributes';
import {NoteModel} from './table-models/attributes/note.attributes';
import {QuoteAttributes, QuoteModel} from './table-models/attributes/quote.attributes';
import {QuoteLineModel} from './table-models/attributes/quote-line.attributes';
import {contactModel} from './table-models/contact.table-model';
import {quoteLineModel} from './table-models/quote-line.table-model';
import {quoteModel} from './table-models/quote.table-model';
import {noteModel} from './table-models/note.table-model';

export interface StoreManager {
	getUser(id: string): Promise<any>;
	// getUserState(): Promise<any>;
	setUserProp(id: string, prop: string | number): Promise<any>;
	// registerUser(user: UserAttributes): void;
	// deleteUser(): Promise<any>;
	createTestUser(): Promise<any>;
	createCompany(company: CompanyAttributes): Promise<any>;
	setCompaniesProp(id, prop): Promise<any>;
}
export class CRMStoreManager {
	public sequelize: sequelizeStatic.Sequelize;
	public User: UserModel;
	public Company: CompanyModel;
	public Contact: ContactModel;
	public Note: NoteModel;
	public Quote: QuoteModel;
	public QuoteLine: QuoteLineModel;

	constructor(private config: DBConfig) {
		this.dbConfig();
		this.modelsInit();
	}

	private syncTable(): void {
		this.sequelize.sync().then(() => {
			this.User.create({
				firstName: 'Test',
				lastName: 'Tester',
				email: 'test@tester.com',
				role: 'admin'
				},{
					// this.Company.create({
					// email: 'test@company.com'},
					// {
					// 	// include: [
					// 	// 	this.Quote.create({
					// 	// 	name: 'test quote',
					// 	// 	}, {
					// 	// 	include: [
					// 	// 		this.QuoteLine.create({
					// 	// 			desc: 'quote line 0'
					// 	// 		})
					// 	// 	]})
					// 	// ]
					// })
				// ]
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
		// this.Contact = contactModel(sequelizeStatic, this.sequelize);
		// this.Resume.hasOne(this.Experience);
	}

	private dbConfig(): void {
		this.sequelize = new sequelizeStatic(this.config.database, this.config.username, this.config.password, {
			host: this.config.host,
			dialect: this.config.dialect,
			pool: {
				max: this.config.pool.max,
				min: this.config.pool.min,
				idle: this.config.pool.idle
			},
			storage: this.config.storage
		});
	}

	public getUser(id: string): Promise<any> {
		console.log('??', id);
		return new Promise((resolve, reject) => {
			this.User.findById(id).then((userInstance: any) => {
					resolve(userInstance.dataValues);
					reject('error with find ID');
			});
		});
	}

	public setUserProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.User.findById(id).then(userInstance => {
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public getCompanies(id?: string): Promise<any> {
		console.log('get companies');
		if(id ) {
			return new Promise((resolve, reject) => {
				this.Company.findById(id).then((companiesInstance: any) => {
					if (companiesInstance && companiesInstance.dataValues.id) {
						resolve(companiesInstance.dataValues);
					} else {
						reject('error with find ID');
					}
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				this.Company.findAll({include: [this.Contact, this.Quote]}).then((companies => {
					console.log('company', companies);
					resolve(companies);
					reject('error: no companies found');
				}));
			});
		}
	}

	public setCompaniesProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.findById(id).then(userInstance => {
				console.log('found company', userInstance);
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createCompany(company: CompanyAttributes): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.create(company).then((companyInstance: any) => {
				console.log(companyInstance);
				resolve(companyInstance.dataValues);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public getContacts(id?: string): Promise<any> {
		if(id) {
			return new Promise((resolve, reject) => {
				this.Contact.findById(id).then((contactsInstance: any) => {
					if (contactsInstance && contactsInstance.dataValues.id) {
						resolve(contactsInstance.dataValues);
					} else {
						reject('error with find ID');
					}
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				this.Contact.findAll().then((contacts => {
					if (contacts.length > 0) {
						resolve(contacts)
					} else {
						reject('error: no contacts found');
					}
				}));
			});
		}
	}

	public setContactsProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.findById(id).then(userInstance => {
				console.log('found contact', userInstance);
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createContacts(contact: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Contact.create(contact).then((contactInstance: any) => {
				resolve(contactInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public getNotes(id?: string): Promise<any> {
		if(id) {
			return new Promise((resolve, reject) => {
				this.Note.findById(id).then((notesInstance: any) => {
					if (notesInstance && notesInstance.dataValues.id) {
						resolve(notesInstance.dataValues);
					} else {
						reject('error with find ID');
					}
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				this.Note.findAll().then((notes => {
					if (notes.length > 0) {
						resolve(notes)
					} else {
						reject('error: no notes found');
					}
				}));
			});
		}
	}

	public setNoteProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findById(id).then(userInstance => {
				console.log('found note', userInstance);
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createNotes(note: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.create(note).then((noteInstance: any) => {
				resolve(noteInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public getQuotes(payload: any): Promise<QuoteAttributes[]> {
		if(payload.id) {
			return new Promise((resolve, reject) => {
				this.Quote.findById(payload.id, {
					include:[this.QuoteLine]
				}).then((quotesInstance: any) => {
					if (quotesInstance && quotesInstance.dataValues.id) {
						resolve(quotesInstance.dataValues);
					} else {
						reject('error with find ID');
					}
				});
			});
		} else {
			return new Promise((resolve) => {
				this.Quote.findAll({
					include: [this.QuoteLine]
				}).then((quotes => {
				console.log('find all', quotes);
					resolve(quotes);
				}));
			});
		}
	}

	public setQuotesProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Quote.findById(id).then(userInstance => {
				console.log('found quote', userInstance);
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createQuotes(quotes: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Quote.create(quotes).then((quoteInstance: any) => {
				resolve(quoteInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createQuoteLine(quoteId, quoteLine): Promise<any> {
		return new Promise((resolve, reject) => {
				this.Quote.findById(quoteId).then((quoteInstance: any) => {
					quoteInstance.QuoteLine.create(quoteLine).then(quoteLineInstance => {
						resolve(quoteLineInstance);
					})
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	// public registerUser(user: UserAttributes): Promise<UserAttributes> {
	// 	return new Promise((resolve, reject) => {
	// 		//todo send to Auth for response
	// 			if (authUser.passHash && authUser.role) {
	// 				this.createUser(authUser).then(userInstance => {
	// 					if (userInstance.id) {
	// 						resolve(userInstance);
	// 					} else {
	// 						reject('error with registration');
	// 					}
	// 				});
	// 			}
	// 	});
	// }

	// private createUser(user: UserAttributes): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		this.User.create({
	// 			firstName: user.firstName,
	// 			lastName: user.lastName,
	// 			passHash: user.passHash,
	// 			email: user.email,
	// 			addressOne: user.addressOne,
	// 			addressTwo: user.addressTwo,
	// 			phone: user.phone,
	// 			role: user.role,
	// 			businessName: user.businessName,
	// 			businessWeb: user.businessWeb,
	// 			businessPhone: user.businessPhone,
	// 			businessFax: user.businessFax,
	// 		}).then(userInstance => {
	// 			console.log('user', userInstance);
	// 			return userInstance;
	// 		})
	// 	})
	// }
}