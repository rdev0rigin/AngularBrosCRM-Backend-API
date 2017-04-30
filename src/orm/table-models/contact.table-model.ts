export function contactModel(DataTypes, sequlize) {
	return sequlize.define('contact', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING
			// required: true
		},
		phone: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: DataTypes.DATE,
		deleted_at: DataTypes.DATE
	}, {
		freezeTableName: true,
		paranoid: false,
		underscored: true
	})
}