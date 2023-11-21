import nodemailer from 'nodemailer';
import {
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_USE_SSL,
	EMAIL_USER,
	EMAIL_PASSWORD
} from '$env/static/private';

export const transporter = nodemailer.createTransport({
	pool: true,
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT),
	secure: Boolean(EMAIL_USE_SSL),
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
	}
});

transporter.verify((error) => {
	if (error) {
		console.error(error);
	} else {
		console.log('🚀 Mailer is ready to take messages');
	}
});
