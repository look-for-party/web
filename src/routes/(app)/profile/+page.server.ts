import { redirect } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/sign-in');
	if (!session.user.emailVerified) {
		throw redirect(302, '/email-verification');
	}
	return {
		userId: session.user.userId,
		username: session.user.username,
		email: session.user.email,
		emailVerified: session.user.emailVerified
	};
};

export const actions = {
	signOut: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/sign-in');
		if (!session.user.emailVerified) {
			throw redirect(302, '/email-verification');
		}
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/sign-in'); // redirect to sign in page
	}
};
