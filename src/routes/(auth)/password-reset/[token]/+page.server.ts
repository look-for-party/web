import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { validatePasswordResetToken } from '$lib/server/token';

export const load = async () => {
	// Server API
	const newPasswordForm = await superValidate(newPasswordSchema);
	// Unless you throw, always return { form } in load and form actions.
	return { newPasswordForm };
};

export const actions = {
	default: async ({ request, params, locals }) => {
		const newPasswordForm = await superValidate(request, newPasswordSchema);
		if (!newPasswordForm.valid) {
			return fail(400, { newPasswordForm });
		}
		const { password } = newPasswordForm.data;
		try {
			const { token } = params;
			const userId = await validatePasswordResetToken(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, password);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true // `Number(true)` if stored as an integer
				});
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			return fail(400, {
				message: 'Invalid or expired password reset link'
			});
		}
		throw redirect(302, '/');
	}
};

const newPasswordSchema = z
	.object({
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
	});
