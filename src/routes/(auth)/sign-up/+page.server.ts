import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

import type { Actions, PageServerLoad } from './$types';

import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';
import { insertUserSchema, user as userTable } from '$lib/server/schema';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	// Server API
	const signUpForm = await superValidate(userSignUpSchema);
	// Unless you throw, always return { form } in load and form actions.
	return { signUpForm };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const signUpForm = await superValidate(request, userSignUpSchema);
		// console.log('POST', signUpForm);
		if (!signUpForm.valid) {
			return fail(400, { signUpForm });
		}
		const { email, password } = signUpForm.data;
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
			// if (e instanceof PostgresError && e.code === '23505') {
			// 	return fail(400, {
			// 		message: 'Email already taken'
			// 	});
			// }
			// Don't need the above check because of the schema below.
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/email-verification');
	}
};

const userSignUpSchema = insertUserSchema
	.pick({ email: true })
	.extend({
		// https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls
		password: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters long'
			})
			.max(64, {
				message: 'Password must be at most 64 characters long'
			}),
		confirmPassword: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters long'
			})
			.max(64, {
				message: 'Password must be at most 64 characters long'
			})
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})
	.refine(
		async ({ email }) => {
			const [user] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email.toLowerCase()));
			if (user) {
				return false;
			}
			return true;
		},
		{
			message: 'Email already taken',
			path: ['email']
		}
	);
