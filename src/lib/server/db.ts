import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { DATABASE_URL } from '$env/static/private'; // Pick up dynamic private environment variables, useful for production

// for query purposes
export const queryClient = postgres(DATABASE_URL); // set to your business demands
export const db: PostgresJsDatabase = drizzle(queryClient);
