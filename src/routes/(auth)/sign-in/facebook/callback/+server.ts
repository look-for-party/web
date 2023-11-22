import { OAuthRequestError } from '@lucia-auth/oauth';
import { eq } from 'drizzle-orm';

import { auth, facebookAuth } from '$lib/server/lucia.js';
import { db } from '$src/lib/server/db.js';
import { user as userTable } from '$src/lib/server/schema.js';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('facebook_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, facebookUser, createUser, createKey } =
			await facebookAuth.validateCallback(code);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			if (!facebookUser.email) throw new Error('Email not provided');
			const [existingDatabaseUserWithEmail] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, facebookUser.email));
			if (existingDatabaseUserWithEmail) {
				// transform `UserSchema` to `User`
				const user = auth.transformDatabaseUser({
					...existingDatabaseUserWithEmail,
					username_lower: existingDatabaseUserWithEmail.usernameLower,
					email_verified: existingDatabaseUserWithEmail.emailVerified
					// put more snake_case to camelCase transformations here
				});
				await createKey(user.userId);
				return user;
			}
			return await createUser({
				attributes: {
					username: facebookUser.name,
					username_lower: facebookUser.name.toLowerCase(),
					email: facebookUser.email,
					email_verified: !!facebookUser.email
				}
			});
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
