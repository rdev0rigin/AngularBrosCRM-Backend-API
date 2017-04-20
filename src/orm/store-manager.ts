import * as sequelizeStatic from 'sequelize';
import {DBConfig} from './config';
import {userModel} from './table-models/user.table-model';
import {UserAttributes, UserModel} from './table-models/attributes/user.attributes';
import {error} from 'util';

export interface StoreManager {
	getUser(id: string): Promise<any>;
	// getUserState(): Promise<any>;
	setUserProp(id: string, prop: string | number): Promise<any>;
	// registerUser(user: UserAttributes): void;
	// deleteUser(): Promise<any>;
}

export class CRMStoreManager implements StoreManager {
	public sequelize: sequelizeStatic.Sequelize;
	public User: UserModel;

	constructor(private config: DBConfig) {
		this.dbConfig();
		this.modelsInit();
	}

	private syncTable(): void {
		this.sequelize.sync().then((instance: any) => {
			console.log(instance);
		})
	}

	private modelsInit(): void {
		this.User = userModel(sequelizeStatic, this.sequelize);
		// this.Contact = contactModel(sequelizeStatic, this.sequelize);
		// this.Resume.hasOne(this.Experience);
	}

	private dbConfig(): void {
		this.sequelize = new sequelizeStatic(this.config.database, this.config.username, this.config.password, {
			host: this.config.host,
			dialect: this.config.dialect,
			pool: {
				max: this.config.pool.max,
				min: this.config.pool.min,
				idle: this.config.pool.idle
			},
			storage: this.config.storage
		});
	}

	public getUser(id): Promise<any> {
		return new Promise((resolve, reject) => {
			this.User.findById(id).then((userInstance: any) => {
				if (userInstance.dataValues.id) {
					resolve(userInstance.dataValues);
				} else {
					reject(userInstance);
				}
			});
		});
	}

	public setUserProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.User.findById(id).then(userInstance => {
				console.log('found user', userInstance);
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				//todo will it break??
				reject(new Error('update error with' + error));
			});
		})
	}

	// public registerUser(user: UserAttributes): Promise<UserAttributes> {
	// 	return new Promise((resolve, reject) => {
	// 		//todo send to Auth for response
	// 			if (authUser.passHash && authUser.role) {
	// 				this.createUser(authUser).then(userInstance => {
	// 					if (userInstance.id) {
	// 						resolve(userInstance);
	// 					} else {
	// 						reject('error with registration');
	// 					}
	// 				});
	// 			}
	// 	});
	// }

	// private createUser(user: UserAttributes): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		this.User.create({
	// 			firstName: user.firstName,
	// 			lastName: user.lastName,
	// 			passHash: user.passHash,
	// 			email: user.email,
	// 			addressOne: user.addressOne,
	// 			addressTwo: user.addressTwo,
	// 			phone: user.phone,
	// 			role: user.role,
	// 			businessName: user.businessName,
	// 			businessWeb: user.businessWeb,
	// 			businessPhone: user.businessPhone,
	// 			businessFax: user.businessFax,
	// 		}).then(userInstance => {
	// 			console.log('user', userInstance);
	// 			return userInstance;
	// 		})
	// 	})
	// }
}