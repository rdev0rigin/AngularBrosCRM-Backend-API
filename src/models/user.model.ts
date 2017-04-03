export interface User {
	id: string,
	passHash: string,
	name: string,
	email: string,
	address: string,
	phone: string,
	role: string,
	companyName: string,
	companyWeb: string,
	companyPhone: string,
	companyFax: string,
	created_at?: Date,
	updated_at?: Date,
	deleted_at?: Date
}