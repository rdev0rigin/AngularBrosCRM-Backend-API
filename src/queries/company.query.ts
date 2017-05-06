import {CompanyInstance, CompanyModel} from '../orm/table-models/attributes/company.attributes';
import {ContactModel} from '../orm/table-models/attributes/contact.attributes';
import {QuoteModel} from '../orm/table-models/attributes/quote.attributes';

export class CompanyQuery {
private Company;
private Quote;
private Contact;
	constructor(private company: CompanyModel, private contact: ContactModel, private quote: QuoteModel ){
	this.Company = company;
	this.Quote = quote;
	this.Contact = contact;
}

	public getCompanies(id?: string): Promise<any> {
		if(id) {
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
					resolve(companies);
					reject('error: no companies found');
				}));
			});
		}
	}

	public setCompaniesProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.findById(id).then((companyInstance: CompanyInstance)=> {
				companyInstance.update({
					[prop.key]:prop.value
				}).then((companyInstance: CompanyInstance) => {
					resolve(companyInstance);
				}, error => reject('Company set prop error :' + error))
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createCompany(company): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Company.create(company).then((companyInstance: CompanyInstance) => {
				resolve(companyInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}


}