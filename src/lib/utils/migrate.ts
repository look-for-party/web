import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { DATABASE_URL } from '$env/static/private';

const migrationClient = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(migrationClient);

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' });
// Don't forget to close the connection, otherwise the script will hang
await migrationClient.end();
