export interface DBConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: string;
	pool: {
		max: number,
		min: number,
		idle: number
	}
	storage: string;
}

export const DB_CONFIG = {
	username: 'rdev',
	password: '',
	database: 'angular-bros-crm',
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './rdev.sql3'
};
