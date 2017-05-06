import {Model, Sequelize, SequelizeStatic, SequelizeStaticAndInstance} from 'sequelize';

export class Queries {
	constructor(){}

	public getById(model: Model<any,any>, payload, options: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			model.findById(payload.id, options)
				.then((responseInstance: any) => {
				resolve(responseInstance.dataValues);
			}, error => reject('error with find ID'));
		});
	}

	public getAll(model: Model<any,any>, options: {}): Promise<any[]> {
		return new Promise((resolve, reject) => {
			model.findAll(options)
				.then((responseInstance: any[]) => {
					responseInstance.map(response => {
						resolve(response.dataValues)
					});
				}, error => reject('error with find All'));
		});
	}



}