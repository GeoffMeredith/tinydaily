import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

interface EmailOptions {
	to: string;
	subject: string;
	message: string;
	html?: string;
	template?: {
		name: string;
		data: Record<string, any>;
	};
}

/**
 * Sends an email using AWS SES
 * @param {EmailOptions} options - The email options
 * @param {string} options.to - The recipient's email address
 * @param {string} options.subject - The subject of the email
 * @param {string} options.message - The plain text body of the email
 * @param {string} [options.html] - The HTML body of the email
 * @param {Object} [options.template] - Template options
 * @param {string} options.template.name - The name of the template to use
 * @param {Object} options.template.data - The data to inject into the template
 */
export const sendEmail = async ({
	to, subject, message, html, template
}: EmailOptions): Promise<string | undefined> => {
	try {
		const params = {
			Source: process.env.AWS_SES_FROM_EMAIL,
			Destination: {
				ToAddresses: [to]
			},
			Message: {
				Subject: {
					Data: subject,
					Charset: 'UTF-8'
				},
				Body: {
					Text: {
						Data: message,
						Charset: 'UTF-8'
					},
					...(html && {
						Html: {
							Data: html,
							Charset: 'UTF-8'
						}
					})
				}
			},
			...(template && {
				Template: template.name,
				TemplateData: JSON.stringify(template.data)
			})
		};

		const command = new SendEmailCommand(params);
		console.log('Sending email command:', command);
		const result = await sesClient.send(command);
		console.log('Email sent result:', result);
		return result?.MessageId || undefined;
	} catch (error) {
		console.error('Error sending email:', error);
		return undefined;
	}
}; 