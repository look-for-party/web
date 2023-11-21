import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { PostgresError } from 'postgres';

import type { Actions, PageServerLoad } from './$types';

import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';
import { isValidEmail } from '$lib/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');
		// basic check
		if (!isValidEmail(email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		if (password !== confirmPassword) {
			return fail(400, {
				message: 'Passwords do not match'
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email.toLowerCase(), // unique id when using "email" auth method
					password // hashed by Lucia
				},
				attributes: {
					username: email.toLowerCase(), // default username
					username_lower: email.toLowerCase(),
					email: email.toLowerCase(),
					email_verified: false
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie

			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(email, token);
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			// https://www.postgresql.org/docs/current/errcodes-appendix.html
			// https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit/
			if (e instanceof PostgresError && e.code === '23505') {
				return fail(400, {
					message: 'Email already taken'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/email-verification');
	}
};
