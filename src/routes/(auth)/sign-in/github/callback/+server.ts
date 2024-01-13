import { OAuthRequestError } from '@lucia-auth/oauth';
import { eq } from 'drizzle-orm';

import { auth, githubAuth } from '$lib/server/lucia';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/schema';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('github_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, githubUser, createUser, createKey } =
			await githubAuth.validateCallback(code);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			if (!githubUser.email) throw new Error('Email not provided');
			const [existingDatabaseUserWithEmail] = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, githubUser.email));
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
					username: githubUser.login,
					username_lower: githubUser.login.toLowerCase(),
					email: githubUser.email,
					email_verified: !!githubUser.email
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
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
