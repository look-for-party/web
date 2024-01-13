import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { eq } from 'drizzle-orm';
import { db } from './db';
import {
	emailVerification as emailVerificationTable,
	passwordReset as passwordVerificationTable
} from './schema';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(emailVerificationTable)
		.where(eq(emailVerificationTable.userId, userId));
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.insert(emailVerificationTable).values({
		id: token,
		userId: userId,
		expires: new Date().getTime() + EXPIRES_IN
	});

	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const [storedToken] = await tx
			.select()
			.from(emailVerificationTable)
			.where(eq(emailVerificationTable.id, token));
		if (!storedToken) throw new Error('Invalid token');
		await tx
			.delete(emailVerificationTable)
			.where(eq(emailVerificationTable.userId, storedToken.userId));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.userId;
};

export const generatePasswordResetToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(passwordVerificationTable)
		.where(eq(passwordVerificationTable.userId, userId));
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.insert(passwordVerificationTable).values({
		id: token,
		userId: userId,
		expires: new Date().getTime() + EXPIRES_IN
	});
	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const [storedToken] = await tx
			.select()
			.from(passwordVerificationTable)
			.where(eq(passwordVerificationTable.id, token));
		if (!storedToken) throw new Error('Invalid token');
		await tx
			.delete(passwordVerificationTable)
			.where(eq(passwordVerificationTable.id, storedToken.id));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.userId;
};
