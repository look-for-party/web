import { faker } from '@faker-js/faker';

import type { Person, MessageFeed } from '$lib/types';

faker.seed(42); // reproducible data

// Create factories for each type
const createRandomPerson = (): Person => ({
	id: faker.number.int(),
	avatar: faker.image.avatar(),
	name: faker.person.fullName()
});

const createRandomMessageFeed = (): MessageFeed => ({
	id: faker.number.int(),
	host: faker.datatype.boolean(),
	avatar: faker.image.avatar(),
	name: faker.person.fullName(),
	// Omit the seconds from the timestamp
	timestamp: faker.date.recent().toLocaleString('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	}),
	message: faker.hacker.phrase(),
	color: 'variant-soft-primary'
});

export const peopleMockData = Array.from({ length: 30 }, createRandomPerson);
export const messageFeedMockData = Array.from({ length: 30 }, createRandomMessageFeed);
