export function quoteLineModel(DataTypes, sequlize) {
	return sequlize.define('quoteLine', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING
		},
		weight: {
			type: DataTypes.DOUBLE
		},
		isCentered: {
			type: DataTypes.BOOLEAN
		},
		unit: {
			type: DataTypes.STRING
		},
		cost: {
			type: DataTypes.FLOAT
		},
		desc: {
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
		underscored: true
	})
}