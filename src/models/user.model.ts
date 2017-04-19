export interface User {
	id: string,
	passHash: string,
	firstName: string,
	lastName: string,
	email: string,
	addressOne: string,
	addressTwo: string,
	phone: string,
	role: string,
	businessName: string,
	businessWeb: string,
	businessPhone: string,
	businessFax: string,
	created_at?: Date,
	updated_at?: Date,
	deleted_at?: Date
}