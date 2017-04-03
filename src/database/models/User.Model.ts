'use strict'

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			required: true
		},
		passHash: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM,
			values: ['user', 'admin', 'contact', 'disabled']
		},
		email: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.STRING
		},
		companyName: {
			type: DataTypes.STRING
		},
		companyWeb: {
			type: DataTypes.STRING
		},
		companyPhone: {
			type: DataTypes.STRING
		},
		companyFax: {
			type: DataTypes.STRING
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at:  DataTypes.DATE,
		deleted_at: DataTypes.DATE
	}, {
		freezeTableName: true,
		paranoid: false,
		underscored: true,
	});
	return User;
};