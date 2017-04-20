import * as Sequelize from 'sequelize';

export interface UserAttributes {
	id?: string,
	passHash?: string,
	firstName?: string,
	lastName?: string,
	email: string,
	addressOne?: string,
	addressTwo?: string,
	phone?: string,
	role: string,
	businessName?: string,
	businessWeb?: string,
	businessPhone?: string,
	businessFax?: string,
	created_at?: Date,
	updated_at?: Date,
	deleted_at?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {}