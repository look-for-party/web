// This file should not contain any runtime logic besides defining the schema.
// See https://orm.drizzle.team/docs/migrations#quick-start
import { pgTable, bigint, varchar, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	username: varchar('username', {
		length: 32
	})
		.unique()
		.notNull(),
	usernameLower: varchar('username_lower', {
		length: 32
	})
		.unique()
		.notNull(),
	email: varchar('email', {
		length: 255
	})
		.unique()
		.notNull(),
	emailVerified: boolean('email_verified').notNull()
	// other user attributes
});

export const session = pgTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = pgTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const emailVerification = pgTable('email_verification_token', {
	id: varchar('id', {
		length: 128
	}).primaryKey(), // Token to send inside the verification link
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull() // Expiration (in milliseconds)
});

export const passwordReset = pgTable('password_reset_token', {
	id: varchar('id', {
		length: 128
	}).primaryKey(), // Token to send inside the reset link
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull() // Expiration (in milliseconds)
});
