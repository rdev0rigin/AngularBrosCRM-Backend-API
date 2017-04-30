export function noteModel(DataTypes, sequlize) {
	return sequlize.define('note', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
		},
		text: {
			type: DataTypes.STRING,
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