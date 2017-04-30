export function companyModel(DataTypes, sequlize) {
	return sequlize.define('company', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			// required: true
		},
		addressOne: {
			type: DataTypes.STRING,
		},
		addressTwo: {
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
		web: {
			type: DataTypes.STRING,
		},
		fax: {
			type: DataTypes.STRING,
		},
		misc: {
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