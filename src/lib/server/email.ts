import { EMAIL_VERIFY } from '$env/static/private';
import { transporter } from './emailSetup';

export const sendEmailVerificationLink = async (email: string, token: string) => {
	const url = `http://localhost:5173/email-verification/${token}`;
	await transporter.sendMail({
		from: EMAIL_VERIFY,
		to: email,
		subject: 'Email Verification',
		text: `Click this link to verify your email: ${url}`,
		html: `<a href="${url}">Click this link to verify your email</a>`
	});
};

export const sendPasswordResetLink = async (email: string, token: string) => {
	const url = `http://localhost:5173/password-reset/${token}`;
	await transporter.sendMail({
		from: EMAIL_VERIFY,
		to: email,
		subject: 'Password Reset',
		text: `Click this link to reset your password: ${url}`,
		html: `<a href="${url}">Click this link to reset your password</a>`
	});
};
