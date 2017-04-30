import * as Sequelize from 'sequelize';

export interface ContactAttributes {
	id?: string;
	name?: string;
	phone?: string;
	email?: string;
	position?: string;
}

export interface ContactInstance extends Sequelize.Instance<ContactAttributes>, ContactAttributes{
}

export interface ContactModel extends Sequelize.Model<ContactInstance, ContactAttributes> {}