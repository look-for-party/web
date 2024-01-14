import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

import { auth } from '$lib/server/lucia';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';
import { db } from '$lib/server/db';
import { selectUserSchema, user as userTable } from '$lib/server/schema';

export const load = async () => {
	const passwordResetForm = await superValidate(passwordResetSchema);
	return { passwordResetForm };
};

export const actions = {
	default: async ({ request }) => {
		const passwordResetForm = await superValidate(request, passwordResetSchema);
		if (!passwordResetForm.valid) {
			return fail(400, { passwordResetForm });
		}
		const { email } = passwordResetForm.data;
		try {
			const [storedUser] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email.toLowerCase()));
			const user = auth.transformDatabaseUser({
				...storedUser,
				username_lower: storedUser.usernameLower,
				email_verified: storedUser.emailVerified
			});
			const token = await generatePasswordResetToken(user.userId);
			await sendPasswordResetLink(user.email, token);
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// TODO: use toast instead of redirect, better UX
		throw redirect(302, '/password-reset/sent');
	}
};

const passwordResetSchema = selectUserSchema
	.pick({
		email: true
	})
	.refine(
		async ({ email }) => {
			const [user] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email.toLowerCase()));
			if (user) {
				return true;
			}
			return false;
		},
		{
			message: 'User does not exist',
			path: ['email']
		}
	);
