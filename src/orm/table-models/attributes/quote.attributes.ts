import * as Sequelize from 'sequelize';

export interface QuoteAttributes {
	id?: string;
	name?: string;
}

export interface QuoteInstance extends Sequelize.Instance<QuoteAttributes>, QuoteAttributes{}

export interface QuoteModel extends Sequelize.Model<QuoteInstance, QuoteAttributes> {}
