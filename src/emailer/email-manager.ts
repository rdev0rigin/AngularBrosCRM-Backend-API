import * as SendGrid from 'sendgrid';
import {MAIL_API_KEY} from '../../mail-key.local'

export class EmailManager {
	public sendGrid = SendGrid;
	public mail = SendGrid.mail;
	constructor(){
	}

	public async sendQuoteEmail(template, sendTo, subject = 'Sending from AngularBros is Fun'): Promise<any> {
		let fromEmail = new this.mail.Email('AngularBros@example.com');
		let toEmail = new this.mail.Email(sendTo);
		let content = new this.mail.Content('text/html', template);
		let mailBody = new this.mail.Mail(fromEmail, subject, toEmail, content);
		let sg = this.sendGrid(MAIL_API_KEY);
		let request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mailBody.toJSON(),
		});

		return sg.API(request)
	}

}
