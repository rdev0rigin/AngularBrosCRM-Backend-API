export function userModel(DataTypes, sequlize) {
	return sequlize.define('user', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		firstName: {
			type: DataTypes.STRING,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		passHash: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM,
			values: ['general', 'blocked', 'admin', 'removed'],
			required: true
		},
		email: {
			type: DataTypes.STRING,
			required: true
		},
		addressOne: {
			type: DataTypes.STRING
		},
		addressTwo: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.STRING
		},
		businessName: {
			type: DataTypes.STRING
		},
		businessWeb: {
			type: DataTypes.STRING
		},
		businessPhone: {
			type: DataTypes.STRING
		},
		businessFax: {
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
		underscored: true,
	})
}