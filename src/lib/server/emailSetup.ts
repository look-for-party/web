// Kept in case we want to use SMTP instead of Postmark API in the future
// import nodemailer from 'nodemailer';
// import { env } from '$env/dynamic/private';

// export const transporter = nodemailer.createTransport({
// 	pool: true,
// 	service: env.EMAIL_SERVICE,
// 	host: env.EMAIL_HOST,
// 	port: Number(env.EMAIL_PORT),
// 	secure: Boolean(env.EMAIL_USE_SSL),
// 	auth: {
// 		user: env.EMAIL_USER,
// 		pass: env.EMAIL_PASSWORD
// 	},
// 	tls: {
// 		// do not fail on invalid certs
// 		rejectUnauthorized: false
// 	}
// });

// transporter.verify((error) => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		console.log('🚀 Mailer is ready to take messages');
// 	}
// });
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { ServerClient } from 'postmark';

export let transporter: ServerClient;

if (!building) {
	transporter = new ServerClient(env.POSTMARK_API_KEY);
}
