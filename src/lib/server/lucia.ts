import { dev } from '$app/environment';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import 'lucia/polyfill/node'; // polyfill, following https://lucia-auth.com/getting-started/#polyfill
import { sveltekit } from 'lucia/middleware';

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
			username: databaseUser.username
		};
	}
});

export type Auth = typeof auth;
