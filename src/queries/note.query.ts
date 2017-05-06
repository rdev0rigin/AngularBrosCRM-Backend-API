import {NoteInstance, NoteModel} from '../orm/table-models/attributes/note.attributes';

export class NoteQuery {
	private Note;
	constructor(private note: NoteModel){
		this.Note = note;
	}

	public getNote(id?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findById(id).then((notes: NoteInstance)=> {
				resolve(notes);
				reject('error: no notes found');
			});
		});
	}

	public getNotes(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findAll()
				.then((notes: NoteInstance[])=> {
					resolve(notes);
					reject('error: no notes found');
				});
		});
	}

	public setNoteProp(prop): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.findById(prop.id).then((note: NoteInstance) => {
				console.log('hit 1 2 3 4', prop);
				note.update({
					[prop.key]:prop[prop.key]
				}).then((note: NoteInstance) => {
					resolve(note);
					reject('update error with');
				});
			});
		})
	}

	public createNotes(note: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Note.create(note).then((noteInstance: any) => {
				resolve(noteInstance);
			}, error => {
				reject('update error with' + error);
			});
		})
	}

}