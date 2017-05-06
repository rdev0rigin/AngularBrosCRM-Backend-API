import * as Sequelize from 'sequelize';

export interface NoteAttributes {
	id?: string;
	title?: string;
	text?: string;
	note?: string;
}

export interface NoteInstance extends Sequelize.Instance<NoteAttributes>, NoteAttributes{}

export interface NoteModel extends Sequelize.Model<NoteInstance, NoteAttributes> {}