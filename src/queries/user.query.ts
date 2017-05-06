export class UserClass {
	public User;
	constructor(){}

	public getUser(id: string): Promise<any> {
		console.log('??', id);
		return new Promise((resolve, reject) => {
			this.User.findById(id).then((userInstance: any) => {
				resolve(userInstance.dataValues);
				reject('error with find ID');
			});
		});
	}

	public setUserProp(id, prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.User.findById(id).then(userInstance => {
				resolve(userInstance.update({
					[prop.key]:prop.value
				}))
			}, error => {
				reject('update error with' + error);
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