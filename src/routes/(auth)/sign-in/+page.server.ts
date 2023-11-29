import { auth } from '$lib/server/lucia';
// import { LuciaError } from 'lucia';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

import { selectUserSchema } from '$lib/server/schema';

// TODO: Implement login throttling https://lucia-auth.com/guidebook/login-throttling/. Consider Postgres vs Redis.

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	// Server API
	const signInForm = await superValidate(userSignInSchema);
	// Unless you throw, always return { form } in load and form actions.
	return { signInForm };
};

export const actions = {
	default: async ({ request, locals }) => {
		const signInForm = await superValidate(request, userSignInSchema);
		// console.log('POST', signInForm);
		if (!signInForm.valid) {
			return fail(400, { signInForm });
		}
		const { email, password } = signInForm.data;
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			// if (
			// 	e instanceof LuciaError &&
			// 	(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			// ) {
			// 	// user does not exist
			// 	// or invalid password
			// 	return fail(400, {
			// 		message: 'Incorrect email or password'
			// 	});
			// }
			// Don't need the above check because of the schema below.
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/');
	}
};

const userSignInSchema = selectUserSchema
	.pick({
		email: true
	})
	.extend({
		password: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters long'
			})
			.max(64, {
				message: 'Password must be at most 64 characters long'
			})
	})
	.superRefine(async ({ email, password }, ctx) => {
		try {
			await auth.useKey('email', email.toLowerCase(), password);
		} catch (e) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Incorrect email or password`,
				path: ['email']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Incorrect email or password`,
				path: ['password']
			});
		}
	});
