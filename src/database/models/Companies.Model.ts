'use strict'

module.exports = (sequelize, DataTypes) => {
	const Companies = sequelize.define('companies', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			required: true
		},
		address: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		zip: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
		Misc: {
			type: DataTypes.STRING
		},
		updated_at:  DataTypes.DATE,
		deleted_at: DataTypes.DATE
	}, {
		freezeTableName: true,
		paranoid: false,
		underscored: true
	});
	return Companies;
};