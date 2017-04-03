'use strict'

module.exports = (sequelize, DataTypes) => {
	const QuoteLines = sequelize.define('quoteLines', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		owner_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		desc: {
			type: DataTypes.STRING,
		},
		cost: {
			type: DataTypes.FLOAT,
			required: true
		},
		isCentered: {
			type: DataTypes.BOOLEAN,
		},
		unit: {
			type: DataTypes.STRING,
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
		underscored: true
	});
	return QuoteLines;
};