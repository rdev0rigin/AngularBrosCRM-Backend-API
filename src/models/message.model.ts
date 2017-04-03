export interface Message {
	id: string,
	name: string,
	owner_id: string,
	type: string,
	sender: string,
	text: string,
	title: string,
	header: string,
	created_at: Date,
	updated_at: Date,
	deleted_at?: Date,
}