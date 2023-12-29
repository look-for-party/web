import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from 'redis';

import { env } from '$env/dynamic/private';
import { building, dev } from '$app/environment';

export const queryClient = postgres(env.DATABASE_URL); // Increase pool size to demands of production
export const db: PostgresJsDatabase = drizzle(queryClient, { logger: dev });

export const redisClient = createClient({
	url: env.REDIS_URL
});

if (!building) {
	console.log('Connecting to Redis...');
	redisClient.on('error', (err) => console.error('Redis Client Error', err)).connect();
}

const shutdownGracefully = async () => {
	await queryClient.end();
	await redisClient.quit();
	process.exit(0);
};
const signals: Record<string, number> = {
	SIGINT: 2, // Ctrl+C
	SIGTERM: 15 // default `kill` command
};

Object.keys(signals).forEach((signal) => {
	process.on(signal, shutdownGracefully);
});
