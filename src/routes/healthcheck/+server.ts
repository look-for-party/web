import { queryClient, redisClient } from '$lib/server/db';

export const GET = async () => {
	try {
		await queryClient`SELECT 1`;
		await redisClient.ping();
		return new Response(null, {
			status: 200
		});
	} catch {
		return new Response(null, {
			status: 500
		});
	}
};
