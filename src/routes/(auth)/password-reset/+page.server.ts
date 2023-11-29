import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

import { auth } from '$lib/server/lucia';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';
import { db } from '$lib/server/db';
import { selectUserSchema, user as userTable } from '$lib/server/schema';

export const load = async () => {
	// Server API
	const passwordResetForm = await superValidate(passwordResetSchema);
	// Unless you throw, always return { form } in load and form actions.
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
			// const storedUser = await db.table('user').where('email', '=', email.toLowerCase()).get();
			const [storedUser] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email.toLowerCase()));
			// if (!storedUser) {
			// 	return fail(400, {
			// 		message: 'User does not exist'
			// 	});
			// }
			// Don't need the above check because of the schema below.
			const user = auth.transformDatabaseUser({
				...storedUser,
				username_lower: storedUser.usernameLower,
				email_verified: storedUser.emailVerified
			});
			const token = await generatePasswordResetToken(user.userId);
			await sendPasswordResetLink(user.email, token);
			return {
				success: true
			};
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
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
