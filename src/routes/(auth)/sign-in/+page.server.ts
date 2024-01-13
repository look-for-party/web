import { auth } from '$lib/server/lucia';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { selectUserSchema } from '$lib/server/schema';

// TODO: Consider Redis for rate limiting in the application level vs Nginx/Traefik, a.k.a. at the load balancer level

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	const signInForm = await superValidate(userSignInSchema);
	return { signInForm };
};

export const actions = {
	default: async ({ request, locals }) => {
		const signInForm = await superValidate(request, userSignInSchema);
		if (!signInForm.valid) {
			return fail(400, { signInForm });
		}
		const { email, password } = signInForm.data;
		try {
			const key = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
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
