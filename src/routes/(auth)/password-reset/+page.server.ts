import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { auth } from '$lib/server/lucia';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/schema';
import { isValidEmail } from '$lib/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		// basic check
		if (!isValidEmail(email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		try {
			// const storedUser = await db.table('user').where('email', '=', email.toLowerCase()).get();
			const [storedUser] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email.toLowerCase()));
			if (!storedUser) {
				return fail(400, {
					message: 'User does not exist'
				});
			}
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
