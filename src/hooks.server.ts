// import { handleHooks } from "@lucia-auth/sveltekit"
import { auth } from '$lib/server/lucia';
// import { sequence } from "@sveltejs/kit/hooks"

export const handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
