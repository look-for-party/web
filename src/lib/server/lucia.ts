import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { redis as redisAdapter } from '@lucia-auth/adapter-session-redis';
import { lucia } from 'lucia';
import 'lucia/polyfill/node'; // polyfill
import { sveltekit } from 'lucia/middleware';
import { google, facebook, github } from '@lucia-auth/oauth/providers';

import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

import { queryClient, redisClient } from './db';

export const auth = lucia({
	adapter: {
		user: postgresAdapter(queryClient, {
			user: 'auth_user',
			key: 'user_key',
			session: null // will be stored in Redis
		}),
		session: redisAdapter(redisClient)
	},
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

export const googleAuth = google(auth, {
	clientId: env.GOOGLE_CLIENT_ID,
	clientSecret: env.GOOGLE_CLIENT_SECRET,
	redirectUri: env.GOOGLE_REDIRECT_URI,
	scope: [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
		'openid'
	]
});

export const facebookAuth = facebook(auth, {
	clientId: env.FACEBOOK_CLIENT_ID,
	clientSecret: env.FACEBOOK_CLIENT_SECRET,
	redirectUri: env.FACEBOOK_REDIRECT_URI,
	scope: ['email', 'public_profile']
});

export const githubAuth = github(auth, {
	clientId: env.GITHUB_CLIENT_ID,
	clientSecret: env.GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
