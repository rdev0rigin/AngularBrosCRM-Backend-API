let Sequelize = require('sequelize');
let sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './rdev.sql3'
});

const db = {
	Sequelize: void 0,
	sequelize: void 0,
	users: void 0,
	messages: void 0,
	companies: void 0,
	quotes: void 0,
	quoteLines: void 0
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./models/User.Model')(sequelize, Sequelize);
db.messages = require('./models/Message.Model')(sequelize, Sequelize);
db.companies = require('./models/Companies.Model')(sequelize, Sequelize);
db.quotes= require('./models/Quotes.Model')(sequelize, Sequelize);
db.quoteLines= require('./models/QuoteLines.Model')(sequelize, Sequelize);
db.companies.hasMany(db.users);
db.companies.hasMany(db.quotes);
db.quotes.hasMany(db.quoteLines);
db.users.hasMany(db.messages);
db.messages.belongsTo(db.users);
db.quoteLines.belongsTo(db.quotes);

module.exports = db;