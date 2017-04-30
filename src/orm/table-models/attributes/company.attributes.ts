import * as Sequelize from 'sequelize';

export interface CompanyAttributes {
	id?: number;
	name?: string;
	addressOne?: string;
	addressTwo?: string;
	city?: string;
	zip?: string;
	phone?: string;
	email?: string;
	web?: string;
	misc?: string;
	fax?: string;
}

export interface CompanyInstance extends Sequelize.Instance<CompanyAttributes>, CompanyAttributes{}

export interface CompanyModel extends Sequelize.Model<CompanyInstance, CompanyAttributes> {}
