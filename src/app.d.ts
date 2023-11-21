/// <reference types="lucia" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte'
// https://github.com/unplugin/unplugin-icons?tab=readme-ov-file#frameworks
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$/lib/server/lucia').Auth;
		// Make sure to update this whenever new columns are added to the user table
		type DatabaseUserAttributes = {
			username: string;
			// https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit/#case-sensitivity
			username_lower: string;
			email: string;
			email_verified: boolean;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
