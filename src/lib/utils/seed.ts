import { faker } from '@faker-js/faker';

import type { Person, MessageFeed, Party } from '$lib/types';

faker.seed(42); // reproducible data

export const interests = [
	'Beginner Friendly',
	'Web',
	'Databases',
	'Machine Learning',
	'Cybersecurity',
	'Mobile Development',
	'Game Development',
	'Cooking',
	'UI/UX',
	'Fitness',
	'Mobile',
	'Health',
	'Art',
	'Design',
	'Languages',
	'Education',
	'Community',
	'Sustainability',
	'App Development',
	'Artisan Crafts',
	'Web Development',
	'E-commerce',
	'Mental Health',
	'AI',
	'Chatbot Development',
	'Environment',
	'Virtual Reality',
	'History'
];

export const commitments = [
	'Less than 10 hours/week',
	'5 - 10 hours/week',
	'10 - 15 hours/week',
	'15 - 20 hours/week',
	'More than 20 hours/week',
	'Flexible'
];

export const skills = [
	'JavaScript',
	'HTML',
	'CSS',
	'React',
	'Firebase',
	'Frontend Development',
	'UI/UX Design',
	'Node.js',
	'React Native',
	'Backend Development',
	'Python',
	'Natural Language Processing',
	'Unity',
	'C#',
	'Graphic Design',
	'VR Development'
];

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

const createRandomParty = (): Party => ({
	id: faker.number.int(),
	name: faker.company.catchPhrase(),
	description: faker.commerce.productDescription(),
	requirement: {
		interests: faker.helpers.arrayElements(interests, { min: 1, max: 5 }),
		commitment: faker.helpers.arrayElement(commitments),
		skills: faker.helpers.arrayElements(skills, { min: 1, max: 10 })
	},
	leader: createRandomPerson(),
	upvotes: faker.number.int(1000),
	thumbnail: faker.image.url()
});

export const peopleMockData = Array.from({ length: 30 }, createRandomPerson);
export const messageFeedMockData = Array.from({ length: 30 }, createRandomMessageFeed);
export const partyMockData = Array.from({ length: 30 }, createRandomParty);
