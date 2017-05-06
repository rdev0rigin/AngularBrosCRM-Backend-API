import {QuoteAttributes, QuoteInstance, QuoteModel} from '../orm/table-models/attributes/quote.attributes';
import {QuoteLineModel} from '../orm/table-models/attributes/quote-line.attributes';

export class QuoteQuery {
	private Quote;
	private QuoteLine;
	constructor(private quote: QuoteModel, private quoteLine: QuoteLineModel){
		this.Quote = quote;
		this.QuoteLine = quoteLine;
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

	public setQuotesProp(id, prop): Promise<QuoteAttributes> {
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

	public createQuotes(payload: any): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.create(payload.props).then((quoteInstance: QuoteInstance) => {
				resolve(quoteInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

	public createQuoteLine(quoteId, quoteLine): Promise<QuoteAttributes> {
		return new Promise((resolve, reject) => {
			this.Quote.findById(quoteId, {
				include: [this.QuoteLine]
			}).then((quoteInstance: QuoteInstance) => {
				this.QuoteLine.create({
					company_id: quoteInstance.id,
					attributes: [quoteLine]
				}).then(quoteLineInstance => {
					resolve(quoteLineInstance);
				})
			}, error => {
				reject('update error with' + error);
			});
		})
	}

}