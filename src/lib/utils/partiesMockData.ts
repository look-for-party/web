import { createRandomPerson } from '.';
import type { Party } from '../types/Party';

export const partiesMockData: Party[] = [
	{
		name: 'Snake web game',
		description: 'We will be making the snake game using javascript.',
		requirements: {
			interests: ['Beginner Friendly', 'Web', 'Game Development'],
			commitment: 'Less than 10 hours/week',
			skills: ['JavaScript']
		},
		leader: createRandomPerson()
	},
	{
		name: 'Interactive Recipe App',
		description: 'Building a web app to explore and share recipes interactively.',
		requirements: {
			interests: ['Cooking', 'Web', 'UI/UX'],
			commitment: 'Flexible',
			skills: ['HTML', 'CSS', 'JavaScript']
		},
		leader: createRandomPerson()
	},
	{
		name: 'Fitness Tracker Mobile App',
		description: 'Developing a mobile app to track fitness activities and progress.',
		requirements: {
			interests: ['Fitness', 'Mobile', 'Health'],
			commitment: '10 to 15 hours/week',
			skills: ['React', 'Firebase']
		},
		leader: createRandomPerson()
	},
	{
		name: 'Online Art Portfolio Showcase',
		description: 'Creating a platform for artists to showcase their work online.',
		requirements: {
			interests: ['Art', 'Web', 'Design'],
			commitment: 'Flexible',
			skills: ['Frontend Development', 'UI/UX Design']
		},
		leader: createRandomPerson()
	}
];
