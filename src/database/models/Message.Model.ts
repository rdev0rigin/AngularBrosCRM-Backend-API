'use strict'

module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define('message', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			required: true
		},
		owner_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM,
			values: ['alert', 'system', 'userMessage', 'notes']
		},
		sender: {
			type: DataTypes.STRING,
			required: true
		},
		text: {
			type: DataTypes.STRING,
			required: true
		},
		title: {
			type: DataTypes.STRING,
			required: true
		},
		header: {
			type: DataTypes.STRING,
			required: true
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
	return Message;
};