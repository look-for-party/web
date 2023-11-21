import { faker } from '@faker-js/faker';
import { createRandomPerson } from '.';
import type { Party } from '../types/Party';

export const partiesMockData: Party[] = [
	{
		id: faker.number.int(),
		name: 'Snake web game',
		description: 'We will be making the snake game using javascript.',
		requirements: {
			interests: ['Beginner Friendly', 'Web', 'Game Development'],
			commitment: 'Less than 10 hours/week',
			skills: ['JavaScript']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Interactive Recipe App',
		description: 'Building a web app to explore and share recipes interactively.',
		requirements: {
			interests: ['Cooking', 'Web', 'UI/UX'],
			commitment: 'Flexible',
			skills: ['HTML', 'CSS', 'JavaScript']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Fitness Tracker Mobile App',
		description: 'Developing a mobile app to track fitness activities and progress.',
		requirements: {
			interests: ['Fitness', 'Mobile', 'Health'],
			commitment: '10 to 15 hours/week',
			skills: ['React', 'Firebase']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		name: 'Online Art Portfolio Showcase',
		id: faker.number.int(),
		description: 'Creating a platform for artists to showcase their work online.',
		requirements: {
			interests: ['Art', 'Web', 'Design'],
			commitment: 'Flexible',
			skills: ['Frontend Development', 'UI/UX Design']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Language Learning Game',
		description: 'Building a game to learn new languages interactively.',
		requirements: {
			interests: ['Languages', 'Game Development', 'Education'],
			commitment: 'Less than 10 hours/week',
			skills: ['React', 'Node.js']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Community Garden Management App',
		description: 'Developing an app to manage community garden activities and resources.',
		requirements: {
			interests: ['Community', 'Sustainability', 'App Development'],
			commitment: 'Flexible',
			skills: ['React Native', 'Firebase']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'E-commerce Website for Local Artisans',
		description: 'Creating an e-commerce platform for local artisans to sell their crafts.',
		requirements: {
			interests: ['Artisan Crafts', 'Web Development', 'E-commerce'],
			commitment: '10 to 15 hours/week',
			skills: ['HTML', 'CSS', 'JavaScript', 'Backend Development']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Mental Wellness Chatbot',
		description: 'Building a chatbot to provide mental health support and resources.',
		requirements: {
			interests: ['Mental Health', 'AI', 'Chatbot Development'],
			commitment: 'Flexible',
			skills: ['Python', 'Natural Language Processing']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Environmental Awareness Game',
		description: 'Creating a game to raise awareness about environmental issues.',
		requirements: {
			interests: ['Environment', 'Game Development', 'Education'],
			commitment: 'Less than 10 hours/week',
			skills: ['Unity', 'C#', 'Graphic Design']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	},
	{
		id: faker.number.int(),
		name: 'Virtual Reality Tour Application',
		description: 'Developing an app for virtual tours of historical landmarks and places.',
		requirements: {
			interests: ['Virtual Reality', 'History', 'App Development'],
			commitment: '10 to 15 hours/week',
			skills: ['Unity', 'C#', 'VR Development']
		},
		leader: createRandomPerson(),
		upvotes: faker.number.int(1000)
	}
];
