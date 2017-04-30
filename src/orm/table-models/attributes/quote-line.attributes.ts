import * as Sequelize from 'sequelize';

export interface QuoteLineAttributes {
	id?: string;
	weight?: number;
	isCentered?: Boolean;
	unit?: string;
	cost?: number;
	desc?: string;
}

export interface QuoteLineInstance extends Sequelize.Instance<QuoteLineAttributes>, QuoteLineAttributes{}

export interface QuoteLineModel extends Sequelize.Model <QuoteLineInstance, QuoteLineAttributes> {}
