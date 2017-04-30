export function quoteModel(DataTypes, sequlize) {
	return sequlize.define('quote', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			// required: true
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
	})
}