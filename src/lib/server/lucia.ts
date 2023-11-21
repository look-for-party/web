import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import 'lucia/polyfill/node'; // polyfill, following https://lucia-auth.com/getting-started/#polyfill
import { sveltekit } from 'lucia/middleware';
import { github } from '@lucia-auth/oauth/providers';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { dev } from '$app/environment';

import { queryClient } from './db';

export const auth = lucia({
	adapter: postgresAdapter(queryClient, {
		user: 'auth_user',
		key: 'user_key',
		session: 'user_session'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes(databaseUser) {
		return {
			username: databaseUser.username,
			usernameLower: databaseUser.username_lower,
			email: databaseUser.email,
			emailVerified: databaseUser.email_verified
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
